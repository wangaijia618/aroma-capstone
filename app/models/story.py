from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from sqlalchemy.sql import func

class Story(db.Model):
    __tablename__ = "stories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    story = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    # created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp())
    # updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.current_timestamp())


#relationship
    user = db.relationship("User", back_populates="stories")
    likes = db.relationship("Like", back_populates="story", cascade='all, delete')
    comments = db.relationship("Comment", back_populates="story", cascade='all, delete')


#####################################
    def num_likes(self):
        return len(self.likes)

    def num_comments(self):
        return len(self.comments)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'story': self.story,
            'img': self.img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def preview_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'story': self.story,
            'img': self.img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'Author': {
                "id": self.user.id,
                "username": self.user.username,
                "profile_photo": self.user.profile_photo
            }
        }
    def full_story_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'story': self.story,
            'img': self.img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_likes': self.num_likes(),
            'num_comments': self.num_comments(),
            'Author': {
                "id": self.user.id,
                "username": self.user.username,
                "bio": self.user.bio,
                "profile_photo": self.user.profile_photo,
                'num_followers': self.user.num_followers(),
                'num_follows': self.user.num_follows()
            }
        }
