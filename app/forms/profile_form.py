from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired


class ProfileForm(FlaskForm):
    bio = StringField('bio', validators=[DataRequired()])
    profile_photo = StringField('profile_photo')
    submit = SubmitField('Save')
