from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Story, Comment, User
from app.forms import StoryForm, CommentForm
import json
story_routes = Blueprint('stories', __name__)


#get all stories
@story_routes.route("/")
def get_all_stories():
    stories = Story.query.all()
    return {'Stories': [story.preview_to_dict() for story in stories]}

#get a single story
@story_routes.route("/<int:id>")
def get_one_story(id):
    story = Story.query.get(id)
    # print('$$$$$$$$$$$$$$', story)
    # print('$$$$$$$$$$$$$$', story.id)
    if story is None:
        return {'message': 'Story could not be found'}, 404
    return story.full_story_to_dict()


@story_routes.route("/current")
@login_required
def get_my_stories():
    filtered_stories = Story.query.filter(Story.user_id == current_user.id).all()
    if filtered_stories:
        return {'Stories': [story.preview_to_dict() for story in filtered_stories]}



@story_routes.route(("/new-story"), methods=['POST'])
@login_required
def new_story():
    data = json.loads(request.data)
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("CCCCCCCCCCCCCCCurrent", current_user.id)
    # print("CCCCCCCCCCCCCCCurrent", type(current_user.id))
    # print("FFFFFFFFFFFFFFFForm", data)
    if form.validate_on_submit():
        data = Story(
            user_id=current_user.id,
            title=form.data["title"],
            story=form.data["story"],
            img=form.data["img"]
        )
        # print("!!!!!!!!!!!!!!!storydata", data)
        db.session.add(data)
        db.session.commit()
        return data.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': 'this is an error test'}, 401


@story_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_story(id):
    story = Story.query.get(id)
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if story is None:
      return {"errors" : "Story couldn't be found"}, 404
    if form.validate_on_submit():
        story=Story.query.get(id)
        story.title=form.data['title']
        story.story=form.data['story']
        story.img=form.data['img']
        story.updated_at=datetime.now()

        db.session.commit()
        return story.preview_to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@story_routes.route('/<int:id>', methods=['DELETE'])
def delete_story(id):
    story = Story.query.get(id)

    if story.user_id != current_user.id:
        return {
        "errors": "Unauthorized! You are not the owner of this story!"
        }, 403

    if story is None:
        return {"errors":"Story couldn't be found"}, 404

    db.session.delete(story)
    db.session.commit()
    return {'messages': "Story was successfully deleted."}


@story_routes.route("/<int:id>/comments")
def get_story_comments(id):

  story = Story.query.get(id)

  if story is None:
    return {"errors": "Story couldn't be found"}, 404

  filtered_comments = Comment.query.filter(Comment.story_id == id).all()

  if filtered_comments is not None:
    return {"Comments": [comment.to_dict()
                        for comment in filtered_comments]}, 200



@story_routes.route('/<int:story_id>/comments', methods=['POST'])
@login_required
def create_story_comment(story_id):
  data = json.loads(request.data)
  story = Story.query.get(story_id)
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
#   print("FFFFFFFFFFFFFFFFFForm",form)
#   print("FFFFFFFFFFFFFFFFFForm",form.data)

#   print("FFFFFFFFFFFFFFFREQUESTDATA", data)
  if not story:
    return {'message': 'Story could not be found'}, 404
  if form.validate_on_submit:
      comment = Comment(
            content=form.data["content"],
            story_id=story_id,
            user_id=current_user.id
        )
    #   print("AAAAAAAAAAAAAAcontent",form.data['content'])
    #   print("!!!!!!!!!!!!!!!storydata", comment)
      db.session.add(comment)
      db.session.commit()
      return comment.to_dict()
  else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401





#############search????????###############
# @product_routes.route("/search/<keyword>")
# def search_product(keyword):
#   products = Product.query.filter(Product.name.like(f"%{keyword}%")).all()
#   return {
#     "Products": [
#       product.to_dict_search() for product in products
#     ]
#   }, 200
