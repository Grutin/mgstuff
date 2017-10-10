from wtforms import Form, TextAreaField, FileField
from wtforms.validators import optional, regexp


class personalityForm(Form):
    freeText = TextAreaField(u'freeText', validators=[optional(), regexp('\s*\S+(?:\s+\S+){100,}')])
    fileField = FileField(u'fileField', validators=[optional(),regexp(r'\.txt$')])