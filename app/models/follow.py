from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Follow(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


#relationship
    user = db.relationship("User", back_populates="follows")


#####################################
    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'followed_id': self.followed_id,
            'User': {
                "id": self.user.id,
                "username": self.user.username,
            }
        }
