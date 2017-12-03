from flask import Flask, jsonify
import threading
import time
from app.data_fetcher import fetch_latest

app = Flask(__name__)

latest_data = []

def background_fetch():
    global latest_data
    while True:
        try:
            latest_data = fetch_latest(city="Los Angeles", parameter="pm25", limit=10)
        except Exception as e:
            print("Fetch error:", e)
        time.sleep(30)

@app.route('/')
def index():
    return 'Real-Time Sensor Dashboard running with background fetcher.'

@app.route('/data')
def data():
    return jsonify(latest_data)

if __name__ == '__main__':
    thread = threading.Thread(target=background_fetch, daemon=True)
    thread.start()
    app.run(debug=True)