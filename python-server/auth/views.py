from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import uuid
from app import users, app
from schema.user import RegistrationSchema
from marshmallow import ValidationError
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        
        # Validate the request data against the schema
        registration_schema = RegistrationSchema()
        registration_schema.validate(data)

        email = data.get('email')
        fname = data.get('fname')
        sname = data.get('sname')

        # Check if user with the given email already exists
        existing_user = users.find_one({'email': email})
        if existing_user:
            return jsonify({"message": "User with this email already exists", "success": False}), 409

        # Generate API key
        api_key = str(uuid.uuid4())

        # Create a new user record
        new_user = {
            'email': email,
            'sname': sname,
            'fname': fname,
            'api_key': api_key,
            'projects': []
        }
        users.insert_one(new_user)
        token = create_access_token(identity=str(new_user['_id']))

        return jsonify({"api_key": api_key, "success": True, "token": token}), 201

    except ValidationError as e:
        return jsonify({"error": str(e), "message": "Invalid registration data", "success": False}), 400

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    user = users.find_one({'email': email})
    if not user:
        return jsonify({"msg": "User not found"}), 404

    access_token = create_access_token(identity=str(user['_id']))
    return jsonify(access_token=access_token), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        user_id = get_jwt_identity()
        user = users.find_one({'_id': ObjectId(user_id)})

        if not user:
            return jsonify({"msg": "User not found"}), 404

        user_profile = {
            "email": user.get('email'),
            "fname": user.get('fname'),
            "sname": user.get('sname'),
            "api_key": user.get('api_key'),
            "projects": user.get('projects', [])
        }

        return jsonify(user_profile), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error"}), 500