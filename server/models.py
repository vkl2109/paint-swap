from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json
from datetime import datetime

db = SQLAlchemy()
migrate = Migrate(db)


class User(db.Model):
    # __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    avatarUrl = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def toJSON(self):
        return {"id": self.id, "username": self.username, "password": self.password, "avatarUrl": self.avatarUrl}

    def __init__(self, username, password, avatarUrl):
        self.username = username
        self.password = password
        self.avatarUrl = avatarUrl

    def __repr__(self):
        return '<User %r>' % self.username


class Room(db.Model):
    # __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    host_sid = db.Column(db.String, unique=True, nullable=False)
    private = db.Column(db.Boolean, nullable=False)
    occupied = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def toJSON(self):
        return {"id": self.id, "name": self.username, "private": self.private, "occupied": self.occupied, "host_sid": self.host_sid}

    def __init__(self, name, private, occupied, host_sid):
        self.name = name
        self.private = private
        self.occupied = occupied
        self.host_sid = host_sid

    def __repr__(self):
        return '<Room %r>' % self.name


class Canvas(db.Model):
    # __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String(80), unique=True, nullable=False)
    svg = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def toJSON(self):
        return {"id": self.id, "theme": self.theme, "svg": self.svg}

    def __init__(self, theme, svg):
        self.name = theme
        self.svg = svg

    def __repr__(self):
        return '<Canvas %r>' % self.theme
