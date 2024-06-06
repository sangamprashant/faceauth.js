from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import mongo
import uuid

project_bp = Blueprint('project', __name__)

@project_bp.route('/create', methods=['POST'])
@jwt_required()
def create_project():
    user_id = get_jwt_identity()
    project_name = request.json.get('project_name')

    project_id = str(uuid.uuid4())
    project = {
        'project_id': project_id,
        'project_name': project_name,
        'user_id': user_id
    }

    mongo.db.projects.insert_one(project)
    return jsonify({"project_id": project_id}), 201

@project_bp.route('/list', methods=['GET'])
@jwt_required()
def list_projects():
    user_id = get_jwt_identity()
    projects = list(mongo.db.projects.find({'user_id': user_id}))
    for project in projects:
        project['_id'] = str(project['_id'])
    return jsonify(projects), 200
