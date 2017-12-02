import requests
import time

OPENAQ_API = "https://api.openaq.org/v1/latest"

def fetch_latest(city="Los Angeles", parameter="pm25", limit=5):
    params = {
        "city": city,
        "parameter": parameter,
        "limit": limit
    }
    r = requests.get(OPENAQ_API, params=params, timeout=10)
    if r.status_code != 200:
        return []
    data = r.json().get("results", [])
    readings = []
    for item in data:
        if "measurements" in item:
            for m in item["measurements"]:
                readings.append({
                    "location": item.get("location"),
                    "parameter": m.get("parameter"),
                    "value": m.get("value"),
                    "unit": m.get("unit"),
                    "date": m.get("lastUpdated")
                })
    return readings

if __name__ == "__main__":
    while True:
        latest = fetch_latest()
        print(latest[:3])
        time.sleep(10)
