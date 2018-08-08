from config import app, db 
from flask import request, Response
from models import WaterTank
import pandas as pd

@app.route('/history', methods=['GET'])
def get_history():
    rcv = request.get_json()
    query = WaterTank.select()
    df = pd.DataFrame(list(query.dicts()))
    return Response('{}', status=451)