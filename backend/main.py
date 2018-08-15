from config import *
from broker import *
from models import *
from authentication import *
from views.tanks import *
from views.productions import *
from views.buoys import *
from views.users import * 
import pandas as pd
import traceback
import sys

# Create a user to test with
@app.before_first_request
def seed_database():
    d = {'role':Role, 'user':User, 'production':Production, 
        'feeding_schedule':FeedingSchedule, 'buoy':Buoy,
        'water_tank':WaterTank, 'record':Record}
    for name in d.keys():
        Model = d[name]
        Model.drop_table(fail_silently=True)
        Model.create_table(fail_silently=True)
        seeder = pd.read_csv('seed/%s.csv' % name).transpose().to_dict()
        for i in seeder.keys():
            entry = seeder[i]
            e = dict_to_model(Model, entry)
            e.save(force_insert=True)

if __name__ == '__main__':
    try:
        # broker.start()
        # broker.subscribe()
        app.run(host='0.0.0.0')
        # time.sleep(1)
        raise Exception('forced exception')
    except:
        broker.stop()
        cache.tmp_persist()
        cache.stop()
        print("Exception in user code:")
        print('-'*60)
        traceback.print_exc(file=sys.stdout)
        print('-'*60)
