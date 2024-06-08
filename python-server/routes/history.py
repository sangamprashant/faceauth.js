from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from datetime import datetime, timezone
from app import users, history, app
from bson import ObjectId
from auth.role import VerifyToken

history_bp = Blueprint('history', __name__)

# Function to add a new action to a user's history
def add_history_action(user_id, action):
    timestamp = datetime.now(timezone.utc).isoformat()
    history_entry = {"action": action, "timestamp": timestamp}

    history.update_one(
        {'user_id': ObjectId(user_id)},
        {'$push': {'actions': history_entry}},
        upsert=True
    )

@history_bp.route('/retrieve', methods=['GET'])
@jwt_required()
def history_retrieve():
    try:
        decoded_token = decode_token(request.headers.get('Authorization').split()[1])
        response = VerifyToken(decoded_token, "access")
        if response:
            return response

        user_id = get_jwt_identity()
        user = users.find_one({'_id': ObjectId(user_id)})

        if not user:
            return jsonify({"message": "User not found", "success": False}), 404

        # Fetch user's history from the history collection
        user_history = history.find_one({'user_id': ObjectId(user_id)})

        if not user_history:
            # If no history exists, create a welcome entry
            welcome_entry = {
                "user_id": str(user_id),
                "actions": [{"action": "Welcome", "timestamp": datetime.now(timezone.utc).isoformat()}]
            }
            history.insert_one(welcome_entry)
            user_history = welcome_entry
        else:
            # Convert ObjectId to string for existing history
            user_history['_id'] = str(user_history['_id'])
            user_history['user_id'] = str(user_history['user_id'])

        return jsonify({"history": user_history, "success": True}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500
