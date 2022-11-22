from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)
