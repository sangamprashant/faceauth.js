from flask import jsonify

def VerifyToken(token, expected_type):
    claims = token.get('type')
    if claims != expected_type:
        return jsonify({"message": "Invalid token type", "success": False}), 403
