from config import app, db 
from flask import request
from models import WaterTank, Buoy, Production, FeedingSchedule
from playhouse.shortcuts import dict_to_model
from helpers import *
from authentication import *
import datetime
import json

# Tanks
@app.route('/tanks', methods=['GET'])
@jwt_required()
def get_all_tanks():
    tanks = WaterTank.select()
    resposta = [tank.get_dict() for tank in tanks]
    return json.dumps(resposta)

@app.route('/tanks', methods=['POST']) # não testada
@jwt_required()
@role_required('operador do sistema')
def create_tank():
    rcv = request.get_json()
    if 'buoy' in rcv.keys():
        try:
            buoy = Buoy.get_by_id(rcv['buoy'])
        except:
            return 'Você não pode associar o tanque a uma boia inexistente'
        try:
            tank = buoy.watertanks[0]
            return 'Essa boia está associada ao tanque' + tank.name
        except:
            pass
    tank = dict_to_model(WaterTank, rcv)
    tank.save(force_insert=True)
    return Response('{}', status=200)

@app.route('/tanks/<tank_id>', methods=['GET'])
@jwt_required() 
def get_tank(tank_id):
    tank = WaterTank.get_by_id(tank_id)
    jsontank = json.dumps(tank.get_dict())
    return jsontank

@app.route('/tanks/<tank_id>', methods=['DELETE'])
@jwt_required() 
def delete_tank(tank_id):
    try:
        tank = WaterTank.get_by_id(tank_id)
        tank.delete_instance()
        return Response('{}', status=200)
    except:
        return Response('{}', status=503)

@app.route('/tanks/<tank_id>', methods=['PUT'])
@jwt_required()
@role_required('biologo') 
def edit_tank(tank_id): # falta checagem de boia 
    rcv = request.get_json()
    if 'capacity' in rcv:
        query = WaterTank.update(capacity=rcv['capacity']).where(
            WaterTank.id == tank_id)
        query.execute()
    if 'waterLevel' in rcv:
        query = WaterTank.update(waterLevel=rcv['waterLevel']).where(
            WaterTank.id == tank_id)
        query.execute()
    if 'temperature' in rcv:
        query = WaterTank.update(temperature=rcv['temperature']).where(
            WaterTank.id == tank_id)
        query.execute()
    if 'salinity' in rcv:
        query = WaterTank.update(salinity=rcv['salinity']).where(
            WaterTank.id == tank_id)
        query.execute()
    if 'turbidity' in rcv:
        query = WaterTank.update(turbidity=rcv['turbidity']).where(
            WaterTank.id == tank_id)
        query.execute()
    if 'qtyShrimps' in rcv:
        query = WaterTank.update(qtyShrimps=rcv['qtyShrimps']).where(
            WaterTank.id == tank_id)
        query.execute()

        tank_now = WaterTank.select().where(WaterTank.id == tank_id)
        prod_id = tank_now[0].production
        tanks = get_tanks_associated_with_production(prod_id)
        qty_total = 0
        for tank in tanks:
            qty_tank = tank.qtyShrimps
            qty_total = qty_total + qty_tank

        query = Production.update(estimatedAmount=qty_total).where(
            Production.id == prod_id)
        query.execute()

    if 'buoy' in rcv:
        buoy = Buoy.select().where(Buoy.id==rcv['buoy'])
        if buoy.exists():
            query = WaterTank.update(buoy=rcv['buoy']).where(
                WaterTank.id == tank_id)
            query.execute()
        else:
            if rcv['buoy'] == 0:
                query = WaterTank.update(buoy=None).where(
                    WaterTank.id == tank_id)
                query.execute()
            
    if 'production' in rcv:
        production = Production.select().where(Production.id==rcv['production'])

        if production.exists():
            if production[0].startDate == None:
                data_start = datetime.datetime.now().strftime("%Y-%m-%d")
                query = Production.update(startDate = data_start).where(
                    Production.id==rcv['production'])
                query.execute()

            query = WaterTank.update(production=rcv['production']).where(
                WaterTank.id == tank_id)
            query.execute()
        else:
            if rcv['production'] == 0:
                query = WaterTank.update(production=None).where(
                    WaterTank.id == tank_id)
                query.execute()

    if 'feedingschedule' in rcv:
        feedingschedule = FeedingSchedule.select().where(FeedingSchedule.id==rcv['feedingschedule'])
        if feedingschedule.exists():
            query = WaterTank.update(feedingschedule=rcv['feedingschedule']).where(
                WaterTank.id == tank_id)
            query.execute()
    return Response('{}', status=200)

@app.route('/tanks/buoy/<buoy_id>', methods=['GET'])
@jwt_required() 
def get_tank_associated_with_buoy(buoy_id):
    tanks = WaterTank.select().where(WaterTank.buoy==buoy_id)
    if tanks.exists():
        resposta = [tank.get_dict() for tank in tanks]
        return json.dumps(resposta)
    else:
        return Response('{}', status=404)

@app.route('/tanks/production/<production_id>', methods=['GET'])
@jwt_required()
def get_tanks_associated_with_production(production_id):
    tanks = WaterTank.select().where(WaterTank.production==production_id)
    if tanks.exists():
        resposta = [tank.get_dict() for tank in tanks]
        return json.dumps(resposta)
    else:
        return Response('{}', status=404)