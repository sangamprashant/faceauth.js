from flask import jsonify
from app import app
from auth.views import auth_bp
from routes.project import project_bp
from routes.history import history_bp
from routes.notification import notifications_bp
import os

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(project_bp, url_prefix='/api/project')
app.register_blueprint(history_bp, url_prefix='/api/history')
app.register_blueprint(notifications_bp, url_prefix='/api/notification')

@app.route("/")
def index():
    try:
        return jsonify({"message": "Connected to server", "success":True}), 200
    except Exception as e:
        return jsonify({"error": str(e), "success":False}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
