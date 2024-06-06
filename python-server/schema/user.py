from marshmallow import Schema, fields, ValidationError

class RegistrationSchema(Schema):
    email = fields.Email(required=True)
    fname = fields.Str(required=True)
    sname = fields.Str(required=True)

    # Custom validation method to ensure all fields are present
    def validate(self, data, **kwargs):
        if not data.get('email') or not data.get('fname') or not data.get('sname'):
            raise ValidationError("All fields are required fields")
