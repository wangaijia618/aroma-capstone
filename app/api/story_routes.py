from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Story, Comment, User
from app.forms import StoryForm, CommentForm

story_routes = Blueprint('stories', __name__)

@story_routes.route("/")
def get_all_stories():
    stories = Story.query.all()
    return {'stories': [story.preview_to_dict() for story in stories]}


@story_routes.route("/<int:id>")
def get_one_story(id):
    story = Story.query.get(id)
    return story.full_story_to_dict()


@story_routes.route('/new-story', methods=['POST'])
@login_required
def new_story():
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = Story(
            user_id = current_user.id,
            title=form.data['title'],
            story=form.data['story'],
            img=form.data['img'],
            created_at=datetime.now()
        )
        db.session.add(data)
        db.session.commit()
        return data.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@story_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_story(id):
    story = Story.query.get(id)
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if story is None:
      return {"errors" : "Story couldn't be found"}, 404
    if form.validate_on_submit():
        story = Story.query.get(id)
        story.title = form.data['title']
        story.story=form.data['story']
        story.img=form.data['img']
        story.updated_at=datetime.now()

        db.session.commit()
        return story.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@story_routes.route('/<int:id>', methods=['DELETE'])
def delete_story(id):
    story = Story.query.get(id)
    db.session.delete(story)
    db.session.commit()

    return "Story was successfully deleted."
