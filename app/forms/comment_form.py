from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired


class CommentForm(FlaskForm):
  content = StringField('content', validators=[DataRequired()])

