from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Story(db.Model):
    __tablename__ = "stories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
