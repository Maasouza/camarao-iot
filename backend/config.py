from flask import Flask
from flask_peewee.db import Database
from flask_mail import Mail
from datetime import timedelta
from flask_cors import CORS

# Create app
app = Flask(__name__)
CORS(app)

# Config database
DATABASE = {
    'name': 'example.db',
    'engine': 'peewee.SqliteDatabase',
}
DEBUG = True
SECRET_KEY = 'ssshhhh'

app.config.from_object(__name__)

# Create database connection object
db = Database(app)

# Create mailer
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'username'
app.config['MAIL_PASSWORD'] = 'password'
mail = Mail(app)

# Flask JWT
app.config['JWT_AUTH_URL_RULE'] = '/login'
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=24)