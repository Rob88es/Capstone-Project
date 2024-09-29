from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()

class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    logged_in = fields.Boolean(dump_only=True)

class CategoriaSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    categoria = fields.String(required=True)

class EventoSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    texto = fields.String(required=True)
    inicia = fields.DateTime(required=True)
    finaliza = fields.DateTime(required=True)
    like_count = fields.Integer(dump_only=True)
    image = fields.String()
    user_id = fields.Integer()
    categoria_id = fields.Integer()

class LikeSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    evento_id = fields.Integer(required=True)
