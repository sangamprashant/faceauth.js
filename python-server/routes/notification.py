from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from datetime import datetime, timezone
from app import users, notifications, app
from bson import ObjectId
from auth.role import VerifyToken

notifications_bp = Blueprint('notifications', __name__)

# Function to add a new action to a user's notifications
def add_notification_action(user_id, action):
    try:
        notification_entry = {"_id": str(ObjectId()), "action": action, "seen": False}
        notifications.update_one(
            {'user_id': str(user_id)},  # Ensuring user_id is a string
            {'$push': {'actions': notification_entry}},
            upsert=True
        )
    except Exception as e:
        app.logger.error(f"Error adding notification action: {str(e)}")
        raise

@notifications_bp.route('/retrieve', methods=['GET'])
@jwt_required()
def notifications_retrieve():
    try:
        decoded_token = decode_token(request.headers.get('Authorization').split()[1])
        response = VerifyToken(decoded_token, "access")
        if response:
            return response
        
        user_id = get_jwt_identity()
        user = users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found", "success": False}), 404
        
        # Fetch user's notifications from the notifications collection
        user_notifications = notifications.find_one({'user_id': str(user_id)})
        if not user_notifications:
            # If no notifications exist, create a welcome entry
            welcome_entry = {
                "user_id": str(user_id),
                "actions": [{"_id": str(ObjectId()), "action": "Welcome to the faceauth.js", "seen": False}]
            }
            notifications.insert_one(welcome_entry)
            user_notifications = welcome_entry
        else:
            # Convert ObjectId to string for existing notifications
            user_notifications['_id'] = str(user_notifications['_id'])
            user_notifications['user_id'] = str(user_notifications['user_id'])
            for action in user_notifications.get('actions', []):
                action['_id'] = str(action['_id'])
        
        return jsonify({"notifications": user_notifications, "success": True}), 200
    
    except Exception as e:
        app.logger.error(f"Error retrieving notifications: {str(e)}")
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500

@notifications_bp.route('/mark_as_seen', methods=['POST'])
@jwt_required()
def mark_as_seen():
    try:
        decoded_token = decode_token(request.headers.get('Authorization').split()[1])
        response = VerifyToken(decoded_token, "access")
        if response:
            return response
        
        user_id = get_jwt_identity()
        notification_id = request.json.get('notification_id')
        if not notification_id:
            return jsonify({"message": "Notification ID is required", "success": False}), 400
        
        # Update the specific notification to mark it as seen
        result = notifications.update_one(
            {'user_id': str(user_id), 'actions._id': notification_id},
            {'$set': {'actions.$.seen': True}}
        )
        
        if result.matched_count == 0:
            return jsonify({"message": "Notification not found", "success": False}), 404
        
        return jsonify({"message": "Notification marked as seen", "success": True}), 200
    
    except Exception as e:
        app.logger.error(f"Error marking notification as seen: {str(e)}")
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500
