from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from app import project
from auth.role import VerifyToken
from routes.history import add_history_action
from routes.notification import add_notification_action
import uuid

project_bp = Blueprint('project', __name__)

@project_bp.route('/create', methods=['POST'])
@jwt_required()
def create_project():
    decoded_token = decode_token(request.headers.get('Authorization').split()[1])
    response = VerifyToken(decoded_token, "access")
    if response:
        return response
    
    user_id = get_jwt_identity()
    project_name = request.json.get('p_name')
    project_description = request.json.get('p_description')
    project_active = request.json.get('p_active')
    project_image  = request.json.get("p_image")

    if not project_name or not project_description:
        return jsonify({"message": "Project name and description are required"}), 400

    project_id = str(uuid.uuid4())
    project_data = {
        'project_id': project_id,
        'project_name': project_name,
        'project_description': project_description,
        'project_active': project_active,
        'user_id': str(user_id),
        'project_image': project_image
    }

    project.insert_one(project_data)
    add_history_action(user_id,"New project created")
    add_notification_action(user_id, "project " + project_name + ", has been successfully created.")
    return jsonify({"message": "Project created successfully"}), 201

@project_bp.route('/list', methods=['GET'])
@jwt_required()
def list_projects():
    decoded_token = decode_token(request.headers.get('Authorization').split()[1])
    response = VerifyToken(decoded_token, "access")
    if response:
        return response
    
    user_id = get_jwt_identity()
    projects = list(project.find({'user_id': user_id}))
    for p in projects:
        p['_id'] = str(p['_id'])
    return jsonify(projects), 200
