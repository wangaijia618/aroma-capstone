from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Follow(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
