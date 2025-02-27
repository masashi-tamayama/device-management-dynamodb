from flask import Flask, jsonify, request
from flask_cors import CORS
from common.db_interface import get_db_interface

app = Flask(__name__)
CORS(app)

db = get_db_interface()

@app.route('/api/devices', methods=['GET'])
def get_devices():
    try:
        devices = db.get_all_devices()
        return jsonify(devices)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices/<device_id>', methods=['GET'])
def get_device(device_id):
    try:
        device = db.get_device(device_id)
        if device:
            return jsonify(device)
        return jsonify({'error': 'Device not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices', methods=['POST'])
def create_device():
    try:
        device_data = request.json
        created_device = db.create_device(device_data)
        return jsonify(created_device), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices/<device_id>', methods=['PUT'])
def update_device(device_id):
    try:
        device_data = request.json
        updated_device = db.update_device(device_id, device_data)
        if updated_device:
            return jsonify(updated_device)
        return jsonify({'error': 'Device not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices/<device_id>', methods=['DELETE'])
def delete_device(device_id):
    try:
        success = db.delete_device(device_id)
        if success:
            return '', 204
        return jsonify({'error': 'Device not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 