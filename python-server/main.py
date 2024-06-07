from flask import Blueprint, request, jsonify
from app import app, db, jwt
from auth.views import auth_bp
from project.views import project_bp
import os

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(project_bp, url_prefix='/api/project')

@app.route("/")
def index():
    try:
        return jsonify({"message": "Connected to server", "success":True}), 200
    except Exception as e:
        return jsonify({"error": str(e), "success":False}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
