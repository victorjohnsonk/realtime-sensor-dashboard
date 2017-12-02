# Real-Time Sensor Dashboard

A local Flask application that streams live air-quality data from the OpenAQ API
and visualizes real-time updates using Flask-SocketIO and Chart.js (2017 era).

## Tech Stack
- Python 3.6
- Flask 0.12
- Flask-SocketIO 2.9
- Eventlet 0.21
- Chart.js 2.7
- D3.js 4.x

## Setup
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

## Run
python app.py
