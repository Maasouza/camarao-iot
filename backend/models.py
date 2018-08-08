from peewee import *
from config import db, app

import datetime

class Role(db.Model):
    name        = TextField()
    description = TextField(null=True)

    def get_dict(self):
        return self.__dict__['__data__']

class User(db.Model):
    name         = TextField()
    email        = TextField()
    password     = TextField()
    username     = TextField()
    active       = BooleanField(default=True)
    confirmed_at = DateTimeField(null=True)
    role         = ForeignKeyField(Role, backref='users')

    def get_dict(self):
        d = self.__dict__['__data__']
        role = Role.get_by_id(d['role'])
        return {'id':d['id'], 'name':d['name'], 'role':role.name, 
            'username':d['username'], 'email':d['email']}

class Production(db.Model):
    name            = TextField(null=True)
    client          = TextField()
    requestedAmount = FloatField()
    estimatedAmount = FloatField(null=True) 
    shrimpClass     = TextField()
    startDate       = DateField(null=True)
    endDate         = DateField()

    def get_dict(self):
        d = self.__dict__['__data__']
        if d['startDate'] != None:
            d['startDate'] = d['startDate'].strftime('%Y-%m-%d')
        else:
            d['startDate'] = 'Não iniciado'
        d['endDate'] = d['endDate'].strftime('%Y-%m-%d')
        return d

class FeedingSchedule(db.Model):
    mix       = TextField()
    frequency = IntegerField(default=7)

    def get_dict(self):
        return self.__dict__['__data__']

class Buoy(db.Model):
    macAddress      = TextField()
    name            = TextField()
    maintenanceDate = DateTimeField(null=True)

    def get_dict(self):
        d = self.__dict__['__data__']
        if self.watertanks.exists():
            d['tank'] = self.watertanks[0].name
        else:
            d['tank'] = None
        return d

class WaterTank(db.Model):
    name            = TextField()
    capacity        = FloatField()
    waterLevel      = FloatField(null=True)
    temperature     = FloatField(null=True)
    salinity        = FloatField(null=True)
    turbidity       = FloatField(null=True)
    qtyShrimps      = FloatField(null=True)
    buoy            = ForeignKeyField(Buoy, backref='watertanks', null=True)
    production      = ForeignKeyField(Production, backref='watertanks', null=True)
    feedingschedule = ForeignKeyField(FeedingSchedule, backref='watertanks', null=True)

    def get_dict(self):
        return self.__dict__['__data__']

class Record(db.Model):
    temperature = FloatField()
    red         = IntegerField()
    green       = IntegerField()
    blue        = IntegerField()
    water_level = IntegerField()
    salinity    = IntegerField()
    timestamp   = DateTimeField(default=datetime.datetime.now)
    buoy        = ForeignKeyField(Buoy, backref='records')

    def get_dict(self):
        return self.__dict__['__data__']


{'water_level': 1, 'salinity': 10, 'time': '2018-08-03T02:43:42.631Z'}