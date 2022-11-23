from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired


class StoryForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    image_url = StringField('image_url')
    submit = SubmitField('publish')
