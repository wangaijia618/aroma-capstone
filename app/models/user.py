from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


follows = db.Table(
    "follows",
    db.Column("followed_user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),

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

    followed = db.relationship(
        "User",
        secondary=follows,  #variable name line7
        primaryjoin=(follows.c.user_id == id),
        secondaryjoin=(follows.c.followed_user_id == id),
        backref=db.backref("follows", lazy="dynamic"),
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

    def is_following(self, user):
        return self.followed.filter(follows.c.followed_user_id == user.id).count() > 0

    def unfollow(self, user):
        if(self.is_following(user)):
            self.followed.remove(user)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def list_followers(self):
        return self.followed.all()

    def list_follows(self):
        return self.follows.all()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profile_photo': self.profile_photo,
            'num_followers': self.num_followers(),
            'num_follows': self.num_follows()
        }
    def author_side_bar_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'bio': self.bio,
            'profile_photo': self.profile_photo,
            'num_followers': self.num_followers(),
            'num_follows': self.num_follows()
        }

    def num_followers(self):
        return len(self.list_followers())

    def num_follows(self):
        return len(self.list_follows())
