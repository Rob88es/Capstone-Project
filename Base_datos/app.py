from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
import models as m
import schemas as s

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456789@localhost:3306/incity'
db = SQLAlchemy(app)
ma = Marshmallow(app)

#--------------------Crear Cuenta usuario
@app.route('/')
def index():
    return "Hola! Esta es la página principal."

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Verificar si el email ya existe
    existing_user = m.User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email ya registrado'})

    # Insertar nuevo usuario
    new_user = m.User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Cuenta creada con exito'})


#------------------------Logging

@app.route('/users/<email>/is_logged_in', methods=['GET'])
def is_user_logged_in(email):
    user = m.User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': 'Usuario no registrado'})
    if is_user_logged_in(user):
        return jsonify({'is_logged_in': True})
    else:
        return jsonify({'is_logged_in': False})


# Ruta para verificar el estado de login de un usuario

@app.route('/users/<email>/login', methods=['GET', 'PUT'])
def user_login(email):
    user = m.User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'Usuario no registrado'})

    if request.method == 'GET':
        return jsonify({'logged_in': user.logged_in})

    if request.method == 'PUT':
        logged_in = request.json['logged_in']
        user.logged_in = logged_in
        db.session.commit()
        return jsonify({'message': 'Login status updated'})



#-------------------------------Categorias

@app.route('/categorias', methods=['GET'])
def get_all_categorias():
    categorias = m.Categoria.query.all()
    result = s.CategoriaSchema(many=True).dump(categorias)
    return jsonify(result)

#-------------------------------Eventos

# Función para obtener un evento por ID
@app.route('/eventos/<int:evento_id>', methods=['GET'])
def get_evento(evento_id):
    evento = m.Evento.query.get(evento_id)

    if evento is None:
        return jsonify({'error': 'evento no encontrado'})

    result = s.EventoSchema().dump(evento)
    return jsonify(result)

# Función para crear un nuevo evento
@app.route('/eventos', methods=['POST'])
def create_evento():
    data = request.get_json()

    new_evento = m.Evento(
        title=data['title'],
        texto=data['texto'],
        inicia=data['inicia'],
        finaliza=data['finaliza'],
        like_count=data['like_count'],
        image=data['image'],
        user_id=data['user_id'],
        categoria_id=data['categoria_id']
    )

    db.session.add(new_evento)
    db.session.commit()

    return jsonify({'message': 'Evento creado'})



# Función para actualizar un evento existente

@app.route('/eventos/<int:evento_id>', methods=['PUT'])
def update_evento(evento_id):
    data = request.get_json()

    evento = m.Evento.query.get(evento_id)
    if evento is None:
        return jsonify({'error': 'Evento no encontrado'})

    evento.texto = data.get('texto', evento.texto)
    evento.inicia = data.get('inicia', evento.inicia)
    evento.finaliza = data.get('finaliza', evento.finaliza)
    evento.image = data.get('image', evento.image)
    evento.categoria_id = data.get('categoria_id', evento.categoria_id) 

    db.session.commit()
    return jsonify({'message': 'Evento actualizado correctamente'})


# Función para eliminar un evento

@app.route('/eventos/<int:evento_id>', methods=['DELETE'])
def delete_evento(evento_id):
    evento = m.Evento.query.get(evento_id)
    if evento is None:
        return jsonify({'error': 'Evento no encontrado'})

    db.session.delete(evento)
    db.session.commit()

    return jsonify({'message': 'Evento eliminado correctamente'})


#funcion de like en eventos

@app.route('/eventos/<int:evento_id>/like', methods=['POST'])
def like_evento(evento_id):
    user_id = request.json['user_id']

    existing_like = m.Like.query.filter_by(user_id=user_id, evento_id=evento_id).first()
    if existing_like:
        return jsonify({'error': 'Solo se le puede dar like una vez'})

    # crear un nuevo like
    new_like = m.Like(user_id=user_id, evento_id=evento_id)
    db.session.add(new_like)

    # Increment the like count for the event
    evento = m.Evento.query.get(evento_id)
    evento.like_count += 1
    db.session.commit()

    return jsonify({'message': 'Like registrado con exito'})


#Eventos con mas like

def get_top_10_eventos():
  top_eventos = m.Evento.query.order_by(m.Evento.like_count.desc()).limit(10).all()
  return top_eventos

@app.route('/eventos/mas_populares', methods=['GET'])
def get_top_10_eventos_route():
  top_eventos = get_top_10_eventos()
  result = jsonify([evento.serialize() for evento in top_eventos]) 
  return result


#cuenta regresiva de eventos

def get_all_eventos_ordered():
    current_time = datetime.utcnow()
    eventos = m.Evento.query.filter(m.Evento.finaliza >= current_time).order_by(m.Evento.finaliza.asc()).all()
    return eventos

@app.route('/eventos/todos_ordenados', methods=['GET'])
def get_all_eventos_ordered_route():
    eventos_ordenados = get_all_eventos_ordered()
    result = jsonify([evento.serialize() for evento in eventos_ordenados])
    return result

if __name__ == '__main__':
    app.run(debug=True)