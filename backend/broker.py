from models import *
from cache import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import emitter
import json

class Broker:

    def __init__(self):
        # key valid for 1 month
        #self.__key = "LvNI43Y9DUdVd6GIOIb6dFjqN0Don6L_"
        self.__key = "Lxdppx1WtAsSHTYWP5c5N-AT5gjR2yyf"
        #self.__channel = "camarao-iot"
        self.__channel = "camarao-iot-test"

        self.__emitter = emitter.Emitter()

    def start(self):
        print("Starting broker connection...")
        self.__emitter.connect({"secure": True})
        self.__emitter.loopStart()

    def stop(self):
        print("Shutting down broker connection...")
        self.__emitter.unsubscribe(self.__key, self.__channel)
        self.__emitter.loopStop()
        self.__emitter.disconnect()

    def subscribe(self):
        self.__emitter.subscribe(self.__key, self.__channel)
        self.__emitter.on("message", self.__on_msg_received)

    def __on_msg_received(self, msg):
        r = msg.asObject()
        del r["time"]
        cache.add(r)


broker = Broker()
