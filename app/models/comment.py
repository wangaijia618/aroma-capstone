from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)


#relationship
    user = db.relationship("User", back_populates="comments")
    story = db.relationship("Story", back_populates="comments")


#####################################
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'content': self.content,
            'createdAt': self.created_at,
            'User': {
                "id": self.user.id,
                "username": self.user.username,
                "profile_photo": self.user.profile_photo,
            },
            'Story': {
                "id": self.story.id,
                "title": self.story.title,
                "img": self.story.img
            }
        }
