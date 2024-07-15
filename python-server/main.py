from flask import jsonify
from app import app
from auth.views import auth_bp
from routes.project import project_bp
from routes.history import history_bp
from routes.notification import notifications_bp
from routes.API import api_bp
from routes.matchImage import match_image_bp
import os

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(project_bp, url_prefix='/api/project')
app.register_blueprint(history_bp, url_prefix='/api/history')
app.register_blueprint(notifications_bp, url_prefix='/api/notification')
app.register_blueprint(api_bp, url_prefix='/api/face-auth')
app.register_blueprint(match_image_bp, url_prefix='/api/try-online')

@app.route("/")
def index():
    try:
        return jsonify({"message": "Connected to server", "success":True}), 200
    except Exception as e:
        return jsonify({"error": str(e),"message":"Failed to connect to server", "success":False}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    # app.run( host='0.0.0.0', port=port)
    app.run(debug=True, host='0.0.0.0', port=port)
