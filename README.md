# Real-Time Sensor Dashboard

![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?logo=d3dotjs&logoColor=white)

A local Flask application that streams live air-quality data from the OpenAQ API
and visualizes real-time updates using Flask-SocketIO and Chart.js

API Source : [OpenAQ API Docs](https://docs.openaq.org/)

## Tech Stack

```
- Python 3.6
- Flask 0.12
- Flask-SocketIO 2.9
- Eventlet 0.21
- Chart.js 2.7
- D3.js 4.x
```

## Setup

Clone the repo and then run:

```
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Run

`python app.py`

then open [http://localhost:5000](http://localhost:5000) in your browser.
