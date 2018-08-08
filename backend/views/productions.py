from config import app, db 
from flask import request, Response
from helpers import *
from models import Production, WaterTank
from authentication import *
from playhouse.shortcuts import dict_to_model, model_to_dict
from datetime import datetime
import json

# Productions
@app.route('/productions', methods=['GET'])
@jwt_required()
@role_required('biologo')
def get_all_productions():
    productions = Production.select()
    resposta = [p.get_dict() for p in productions]
    return json.dumps(resposta)

@app.route('/productions', methods=['POST'])
@jwt_required()
@role_required('gerente')
def create_production():
    try:
        rcv = request.get_json()
        production = dict_to_model(Production, rcv)
        production.save(force_insert=True)
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/productions/<prod_id>', methods=['GET'])
@jwt_required()
@role_required('biologo')
def get_production(prod_id):
    try:
        production = Production.get_by_id(prod_id)
        jsonprod = json.dumps(production.get_dict())
        return jsonprod
    except:
        return Response('{}', status=404)

@app.route('/productions/<prod_id>', methods=['DELETE'])
@jwt_required()
@role_required('operador do sistema')
def delete_production(prod_id):
    try:
        production = Production.get_by_id(prod_id)
        production.delete_instance()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/productions/<production_id>', methods=['PUT'])
@jwt_required()
@role_required('gerente')
def edit_production(production_id):
    try:
        rcv = request.get_json()
        if 'name' in rcv:
            query = Production.update(name=rcv['name']).where(
                Production.id == production_id)
            query.execute()
        if 'client':
            query = Production.update(client=rcv['client']).where(
                Production.id == production_id)
            query.execute()
        if 'shrimpClass' in rcv:
            query = Production.update(shrimpClass=rcv['shrimpClass']).where(
                Production.id == production_id)
            query.execute()
        if 'requestedAmount' in rcv:
            query = Production.update(requestedAmount=rcv['requestedAmount']).where(
                Production.id == production_id)
            query.execute()
        if 'estimatedAmount' in rcv:
            query = Production.update(estimatedAmount=rcv['estimatedAmount']).where(
                Production.id == production_id)
            query.execute()
        if 'endDate' in rcv:
            newEndDate = datetime.strptime(rcv['endDate'], '%Y-%m-%d')
            query = Production.update(endDate=newEndDate).where(
                Production.id == production_id)
            query.execute()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/productions/tank/<tank_id>', methods=['GET'])
@jwt_required()
@role_required('biologo')
def get_productions_associated_with_tank(tank_id):
    tank = WaterTank.get_by_id(tank_id)
    return json.dumps(tank.production.get_dict())