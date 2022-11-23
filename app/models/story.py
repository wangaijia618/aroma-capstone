from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class Story(db.Model):
    __tablename__ = "stories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    story = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)


#relationship
    user = db.relationship("User", back_populates="stories")
    # category = db.relationship("Category", back_populates="stories")
    likes = db.relationship("Like", back_populate="story", cascade='all, delete-orphan')
    comments = db.relationship("Comment", back_populate="story", cascade='all, delete-orphan')


#####################################
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
                "bio": self.bio,
                "profile_photo": self.profile_photo
            }
        }



    def num_likes(self):
        return len(self.likes)

    def num_comments(self):
        return len(self.comments)
