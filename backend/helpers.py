from functools import wraps
from models import Role
from flask import g, request, redirect, url_for, Response
from authentication import current_identity

def role_required(role=None):
    authorizations = {"operador do sistema":["operador do sistema", "gerente", "biologo", "cuidador do tanque"],
                        "gerente":["gerente", "biologo", "cuidador do tanque"],
                        "biologo":["biologo"],
                        "cuidador do tanque":["cuidador do tanque"]}
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if role in authorizations[current_identity.role.name]:
                return f(*args, **kwargs)
            else:
                return Response(status=401)
        return decorated_function
    return decorator