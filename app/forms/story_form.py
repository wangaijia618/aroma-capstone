from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired
from sqlalchemy import DateTime

class StoryForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    story = TextAreaField('story', validators=[DataRequired()])
    img = StringField('img')
    submit = SubmitField('Publish')
