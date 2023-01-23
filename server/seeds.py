from app import app
from models import db, User
from datetime import datetime


def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()
        print('Seeding database ... 🌱')

        user1 = User('player1', '12345', '')
        db.session.add(user1)
        db.session.commit()

        print('Done! 🌳')


run_seeds()
