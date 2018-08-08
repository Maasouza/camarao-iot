from config import app, db 
from flask import render_template
from models import User, Role
from flask import request, Response
from playhouse.shortcuts import dict_to_model
from authentication import *
from helpers import *
import json

# Users
@app.route('/whoami', methods=['GET'])
@jwt_required()
def whoami():
    return json.dumps(current_identity.get_dict())

@app.route('/users', methods=['GET'])
@jwt_required()
@role_required('gerente')
def get_all_users():
    users = User.select()
    resposta = [u.get_dict() for u in users]
    return json.dumps(resposta)

@app.route('/users', methods=['POST'])
@jwt_required()
@role_required('operador do sistema')
def create_user():
    rcv = request.get_json()
    rcv['password'] = 'senha'+rcv['username']
    user = dict_to_model(User, rcv)
    user.save(force_insert=True)
    return Response('{}', status=200)

@app.route('/users/<user_id>', methods=['GET'])
@jwt_required()
@role_required('operador do sistema')
def get_user(user_id):
    user = User.get_by_id(user_id)
    jsonUser = json.dumps(user.get_dict())
    return jsonUser 

@app.route('/users/<user_id>', methods=['DELETE'])
@jwt_required()
@role_required('operador do sistema')
def delete_user(user_id):
    try:
        user = User.get_by_id(user_id)
        user.delete_instance()

        return Response("{}",status=200)
    except:
        return Response('{}', status=503)

def edit_user(user_id):
    try:
        rcv = request.get_json()
        if 'name' in rcv:
            query = User.update(name=rcv['name']).where(
                User.id == user_id)
            query.execute()
        if 'username' in rcv:
            query = User.update(username=rcv['username']).where(
                User.id == user_id)
            query.execute()
        if 'email' in rcv:
            query = User.update(email=rcv['email']).where(
                User.id == user_id)
            query.execute()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/users/', methods=['PUT'])
@jwt_required()
def edit_own_user():
    return edit_user(current_identity.id)

@app.route('/users/<user_id>', methods=['PUT'])
@jwt_required()
@role_required('operador do sistema')
def edit_other_user(user_id):
    return edit_user(user_id)

@app.route('/users/role/<role>', methods=['GET'])
@jwt_required()
@role_required('operador do sistema')
def get_users_with_role(role):
    users = User.select().where(User.role==role)
    if users.exists():
        resposta = [user.get_dict() for user in users]
        return json.dumps(resposta)
    else:
        return Response('{}', status=404)