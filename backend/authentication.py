from config import * 
from models import User, Role
from flask_jwt import JWT, jwt_required, current_identity
import json
from werkzeug.security import safe_str_cmp, generate_password_hash

def authenticate(username, password):
    try:
        user = User.get(User.username == username)
        if safe_str_cmp(user.password.encode('utf-8'),
            password.encode('utf-8')):
            return user
    except:
        return None

def identity(payload):
    user_id = payload['identity']
    try:
        return User.get_by_id(user_id)
    except:
        return None

jwt = JWT(app, authenticate, identity)

@jwt.auth_response_handler
def customized_response_handler(access_token, identity):
    return json.dumps({
                        'access_token': access_token.decode('utf-8'),
                        'user': identity.get_dict()
                   })