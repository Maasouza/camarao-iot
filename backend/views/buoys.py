from config import app, db 
from flask import request, Response
from models import Buoy, WaterTank
from helpers import *
from authentication import *
from playhouse.shortcuts import dict_to_model 
import json

# Buoys
@app.route('/buoys', methods=['GET'])
@jwt_required()
@role_required('operador do sistema')
def get_all_buoys():
    buoys = Buoy.select()
    resposta = []
    for b in buoys:
        d = b.get_dict()
        try: d['tank'] = b.watertanks[0].name
        except: d['tank'] = 'Livre'
        resposta.append(d)
    return json.dumps(resposta)

@app.route('/buoys', methods=['POST'])
@jwt_required()
@role_required('operador do sistema')
def create_buoy():
    try:
        rcv = request.get_json()
        buoy = dict_to_model(Buoy, rcv)
        buoy.save(force_insert=True)
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/buoys/<buoy_id>', methods=['GET'])
@jwt_required()
@role_required('operador do sistema')
def get_buoy(buoy_id):
    buoy = Buoy.get_by_id(buoy_id)
    jsonbuoy = json.dumps(buoy.get_dict())
    return jsonbuoy

@app.route('/buoys/<buoy_id>', methods=['DELETE'])
@jwt_required()
@role_required('operador do sistema')
def delete_buoy(buoy_id):
    buoy = Buoy.get_by_id(buoy_id)
    try: 
        buoy.delete_instance()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/buoys/<buoy_id>', methods=['PUT'])
@jwt_required()
@role_required('operador do sistema')
def edit_buoy(buoy_id):
    try:
        rcv = request.get_json()
        if 'name' in rcv:
            query = Buoy.update(name=rcv['name']).where(
                Buoy.id == buoy_id)
            query.execute()
        if 'maintenanceDate' in rcv:
            query = Buoy.update(maintenanceDate=rcv['maintenanceDate']).where(
                Buoy.id == buoy_id)
            query.execute()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/buoys/free', methods=['GET'])
@jwt_required()
@role_required('operador do sistema')
def get_free_buoys():
    buoys = Buoy.select()
    resposta = [buoy.get_dict() for buoy in buoys if len(buoy.watertanks) == 0]
    return json.dumps(resposta)

@app.route('/buoys/tank/<tank_id>', methods=['GET'])
@jwt_required()
def get_buoys_associated_with_tank(tank_id): # não sei se funciona para múltiplas boias
    tank = WaterTank.get_by_id(tank_id)
    return json.dumps(tank.buoy.get_dict())