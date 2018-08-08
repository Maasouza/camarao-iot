from threading import Lock, Thread
from models import *
import time
import pickle
import pathlib

class Cache(Thread):
    '''
    Creates a thread-safe in-memory cache for the records.

    Parameters:
        tup = Time until persistence    Time in seconds until call persist()
        filename = Filename for temp    Fiilename for temp disk persistence
    '''
    def __init__(self, tup, filename):
        Thread.__init__(self)
        self.__filename = filename
        if pathlib.Path(self.__filename).exists():
            self.__list = pickle.load(open(self.__filename, "rb"))
        else:
            self.__list = []
        self.__lock = Lock()
        self.__tup = tup

    def run(self):
        while not self._is_stopped:
            time.sleep(self.__tup)
            self.persist()
    
    def stop(self):
        self._is_stopped = True

    def add(self, record):
        with self.__lock:
            print('added to cache', record)
            self.__list.append(record)

    def persist(self):
        with self.__lock:
            print('persisting', len(self.__list))
            if len(self.__list) > 0:
                res = Record.insert_many(self.__list).execute()
                self.__list.clear()

    def tmp_persist(self):
        print('dumped to .p', len(self.__list))
        pickle.dump(self.__list, open(self.__filename, "wb"))


cache = Cache(10, "records_cache.p")
cache.start()
