from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Comment, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/current")
@login_required
def get_my_comments():
    filtered_comments = Comment.query.filter(Comment.user_id == current_user.id).all()
    if filtered_comments:
        return {'Comments': [comment.to_dict() for comment in filtered_comments]}


# @comment_routes.route("/<int:id>")
# def get_one_story(id):
#     story = Comment.query.get(id)
#     return story.full_story_to_dict()


# @comment_routes.route('/<int:review_id>', methods=['POST'])
# @login_required
# def new_story():
#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         data = Story(
#             user_id = current_user.id,
#             title=form.data['title'],
#             story=form.data['story'],
#             img=form.data['img'],
#             created_at=datetime.now()
#         )
#         db.session.add(data)
#         db.session.commit()
#         return data.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    # comment = Comment.query.filter(Comment.id == comment_id).first()
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if comment is None:
      return {"errors" : "Comment couldn't be found"}, 404
    if comment.user_id != current_user.id:
        return {"errors" : "You are not the owner of this comment"}, 403
    if form.validate_on_submit():
        # comment = Comment.query.get(comment_id)
        comment.content = form.data['content']

        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment.user_id is not current_user.id:
        return {
        "errors": "Unauthorized! You are not the owner of this comment!"
        }, 403

    if comment is None:
        return {"errors":"Comment couldn't be found"}, 404
        
    db.session.delete(comment)
    db.session.commit()
    return "Comment was successfully deleted."
