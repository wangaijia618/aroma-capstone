from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),

)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(300))
    profile_photo = db.Column(db.String(300))

    followers = db.relationship(
        "User",
        secondary=follows,  #variable name line7
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic",
    )

    likes = db.relationship("Like", back_populates='user', cascade='all, delete')
    comments = db.relationship("Comment", back_populates='user', cascade='all, delete')
    stories = db.relationship("Story", back_populates='user', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def is_following(self, user):
    #     return self.followed.filter(follows.c.followed_user_id == user.id).count() > 0

    # def unfollow(self, user):
    #     if(self.is_following(user)):
    #         self.followed.remove(user)

    # def follow(self, user):
    #     if not self.is_following(user):
    #         self.followed.append(user)

    # def list_followers(self):
    #     return self.followed.all()

    # def list_follows(self):
    #     return self.follows.all()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profile_photo': self.profile_photo
        }
