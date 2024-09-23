from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(18), nullable=False)
    logged_in = db.Column(db.Boolean, default=False)
    eventos = db.relationship('Evento', backref='user', lazy='dynamic')
    likes = db.relationship('Like', backref='user', lazy='dynamic')

class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    categoria = db.Column(db.String(20), unique=True, nullable=False)
    eventos = db.relationship('Evento', backref='categoria', lazy='dynamic')

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(60), nullable=False)
    texto = db.Column(db.Text, nullable=False)
    inicia = db.Column(db.DateTime, nullable=False)
    finaliza = db.Column(db.DateTime, nullable=False)
    like_count = db.Column(db.Integer, default=0)
    image = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    categoria_id = db.Column(db.Integer, db.ForeignKey('category.id'))

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))