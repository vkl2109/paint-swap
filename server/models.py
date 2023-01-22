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