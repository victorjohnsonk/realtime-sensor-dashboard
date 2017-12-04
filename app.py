from flask import Flask, jsonify, render_template
from flask_socketio import SocketIO, emit
import threading
import time
from app.data_fetcher import fetch_latest

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

latest_data = []
active_filters = {"city": "Los Angeles", "parameter": "pm25"}

def background_fetch():
    global latest_data
    while True:
        try:
            new_data = fetch_latest(
                city=active_filters["city"],
                parameters=[active_filters["parameter"]],
                limit=10
            )
            if new_data != latest_data:
                latest_data = new_data
                socketio.emit('new_data', latest_data, broadcast=True)
        except Exception as e:
            print("Fetch error:", e)
        time.sleep(30)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    return jsonify(latest_data)

@socketio.on('filter_change')
def handle_filter_change(msg):
    city = msg.get('city', 'Los Angeles')
    param = msg.get('parameter', 'pm25')
    active_filters["city"] = city
    active_filters["parameter"] = param
    print("Filter updated:", active_filters)
    emit('status', {'message': 'Filters updated'}, broadcast=False)

if __name__ == '__main__':
    thread = threading.Thread(target=background_fetch, daemon=True)
    thread.start()
    socketio.run(app, debug=True)
