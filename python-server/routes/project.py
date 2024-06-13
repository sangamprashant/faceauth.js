from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from app import project
from auth.role import VerifyToken
from routes.history import add_history_action
from routes.notification import add_notification_action
from bson import ObjectId
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
        p.pop('users', None)
        p['_id'] = str(p['_id'])
    return jsonify(projects), 200

@project_bp.route('/get/<project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    try:
        # Decode JWT token and verify access
        decoded_token = decode_token(request.headers.get('Authorization').split()[1])
        response = VerifyToken(decoded_token, "access")
        if response:
            return response
        
        # Get user ID from token
        user_id = get_jwt_identity()
        
        # Check if the project exists and belongs to the user
        project_data = project.find_one({'_id': ObjectId(project_id), 'user_id': user_id})
        if not project_data:
            return jsonify({"message": "Project not found or unauthorized"}), 404
        
        # Convert ObjectId to string for JSON serialization
        project_data['_id'] = str(project_data['_id'])
        
        # Remove user_id from project_data
        project_data.pop('user_id', None)

        # Remove face_encoding and payload from project_data.users
        if 'users' in project_data:
            for user in project_data['users']:
                user.pop('face_encoding', None)
                user.pop('payload', None)
                user.pop('pin', None)
        
        return jsonify(project_data), 200
    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error"}), 500
    
@project_bp.route('/toggle_active/<project_id>', methods=['GET'])
@jwt_required()
def toggle_project_active(project_id):
    try:
        # Decode JWT token and verify access
        decoded_token = decode_token(request.headers.get('Authorization').split()[1])
        response = VerifyToken(decoded_token, "access")
        if response:
            return response
        
        # Get user ID from token
        user_id = get_jwt_identity()
        
        # Check if the project exists and belongs to the user
        project_data = project.find_one({'_id': ObjectId(project_id), 'user_id': user_id})
        if not project_data:
            return jsonify({"message": "Project not found or unauthorized"}), 404
        
        # Toggle the active status
        new_status = not project_data['project_active']
        project.update_one({'_id': ObjectId(project_id)}, {'$set': {'project_active': new_status}})
        
        # Add history and notification
        add_history_action(user_id, f"Project {project_data['project_name']} status toggled to {'active' if new_status else 'inactive'}")
        add_notification_action(user_id, f"Project {project_data['project_name']} status has been toggled to {'active' if new_status else 'inactive'}")
        
        return jsonify({"message": "Project status updated successfully", "new_status": new_status}), 200
    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error"}), 500