import os
from flask import Flask, send_file, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db, User, Room, Canvas
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_socketio import SocketIO, send, emit


app = Flask(__name__, static_folder='public')
CORS(app, origins=['*'])
app.config.from_object(Config)
jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins='*')


@app.get('/')
def home():
    return send_file('welcome.html')


@app.post('/login')
def login():
    data = request.json
    print('data is', data)
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'error': 'No account found'}), 404
    else:
        given_password = data['password']
        if user.password == given_password:
            access_token = create_access_token(identity=user.id)
            return jsonify({'user': user.toJSON(), 'token': access_token}), 200
        else:
            return jsonify({'error': 'Invalid Password'}), 422


@app.post('/autologin')
@jwt_required()
def auto_login():
    current_user = get_jwt_identity()
    print('user_id is', current_user)

    user = User.query.get(int(current_user))

    if not user:
        return jsonify({'error': 'No account found'}), 404
    else:
        return jsonify(user.toJSON()), 200


@app.post('/users')
def create_user():
    data = request.json
    user = User(data['username'], data['email'],
                data['password'], data['avatarURL'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.toJSON()), 201


@app.post('/rooms/<name>')
@jwt_required()
def join_private_room(name):
    room = Room.query.filter_by(room_name=name).first()
    current_user = User.query.get(get_jwt_identity())
    room.player_sid = current_user.sid
    # print(current_user.sid)
    socketio.emit('join_success', {
        'message': f'{room.id}'}, room=room.host_sid)
    socketio.emit('join_success', {
        'message': f'{room.id}'}, room=current_user.sid)
    return jsonify(room.toJSON()), 201


@app.post('/rooms')
@jwt_required()
def create_room():
    data = request.json

    if Room.query.filter_by(room_name=data['name']).first():
        return jsonify('Name taken'), 403

    current_user = User.query.get(get_jwt_identity())
    host_sid = current_user.sid
    room = Room(data['name'], data['private'], False, host_sid)
    db.session.add(room)
    db.session.commit()
    return jsonify(room.toJSON()), 201


@app.get('/rooms/<int:id>')
@jwt_required()
def join_room(id):
    # data = request.json
    # room_id = data.get('room', '')
    room = Room.query.filter_by(id=id)
    # if not room_id.isnumeric():
    #     return '', 400
    # room = Room.query.get(int(room_id))
    # user = User.query.get(int(current_user))
    current_user = get_jwt_identity()
    room.player_sid = current_user.sid
    socketio.emit('join_success', {
        'message': f'{room.id}'}, room=current_user.sid)
    socketio.emit('join_success', {
        'message': f'{room.id}'}, room=room.host_sid)


@socketio.on('connect')
@jwt_required()
def connected():
    current_user = User.query.get(get_jwt_identity())
    current_user.sid = request.sid
    db.session.commit()
    emit('connect', {'data': f'id: {request.sid} is connected'})


@socketio.on('data')
def handle_message(data):
    '''This function runs whenever a client sends a socket message to be broadcast'''
    print(f'Message from Client {request.sid} : ', data)
    emit('data', {'data': 'data', 'id': request.sid}, broadcast=True)

    print(jsonify(request.data))

    # @socketio.on("disconnect")
    # def disconnected():
    #     '''This function is an event listener that gets called when the client disconnects from the server'''
    #     print(f'Client {request.sid} has disconnected')
    #     emit('disconnect',
    #          f'Client {request.sid} has disconnected', broadcast=True)

    # @socketio.on('join')
    # def handle_join(room_name):
    #     join_room(room_name)
    #     emit('join_success', {'message': f'Successfully joined room {room_name}'}, room=room_name)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=os.environ.get('PORT', 3001))
