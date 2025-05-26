from flask import Flask, jsonify
from collections import OrderedDict
from threading import Lock
import requests

app = Flask(__name__)

WINDOW_SIZE = 10
THIRD_PARTY_BASE_URL = "http://20.244.56.144/evaluation-service"

BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY5NTkzLCJpYXQiOjE3NDgwNjkyOTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYzOTg4NmIzLTdmMmYtNDQ2My1iMTJkLTk0YjY1ZmVjYWJlYyIsInN1YiI6Im5hbmRodTIzNzRAZ21haWwuY29tIn0sImVtYWlsIjoibmFuZGh1MjM3NEBnbWFpbC5jb20iLCJuYW1lIjoibmFuZGhhbmEiLCJyb2xsTm8iOiI5Mjc2MjJiYWwwMzEiLCJhY2Nlc3NDb2RlIjoid2hlUVV5IiwiY2xpZW50SUQiOiJmMzk4ODZiMy03ZjJmLTQ0NjMtYjEyZC05NGI2NWZlY2FiZWMiLCJjbGllbnRTZWNyZXQiOiJhTldObXRSdk1OZGRyaGptIn0.ucNtPvEBW-YPeTKT8O-cn7S2SKI6HYvr2L10gXGxS-c"

ENDPOINT_MAPPING = {
    'p': 'primes',   # Prime numbers endpoint
    'f': 'fibo',     # Fibonacci numbers endpoint
    'e': 'even',     # Even numbers endpoint
    'r': 'rand'      # Random numbers endpoint
}

number_windows = {}
window_lock = Lock()

def fetch_numbers(number_type):
    endpoint = ENDPOINT_MAPPING.get(number_type)
    if not endpoint:
        print(f"[fetch_numbers] Invalid number type: {number_type}")
        return None

    url = f"{THIRD_PARTY_BASE_URL}/{endpoint}"
    headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}
    print(f"[fetch_numbers] Fetching URL: {url}")
    print(f"[fetch_numbers] Headers: {headers}")

    try:
        response = requests.get(url, headers=headers, timeout=5)
        print(f"[fetch_numbers] Response Status Code: {response.status_code}")
        print(f"[fetch_numbers] Response Content: {response.text}")

        if response.status_code == 200:
            data = response.json()
            print(f"[fetch_numbers] Response JSON: {data}")
            # Handle possible different keys for numbers
            numbers = data.get('numbers') or data.get('ousbers') or []
            if not isinstance(numbers, list):
                numbers = []
            return numbers
        else:
            print(f"[fetch_numbers] API error {response.status_code}: {response.text}")
            return None
    except Exception as e:
        print(f"[fetch_numbers] Request failed: {str(e)}")
        return None

@app.route('/numbers/<string:number_id>')
def get_numbers(number_id):
    if number_id not in ENDPOINT_MAPPING:
        return jsonify({"error": "Invalid number type"}), 400

    prev_window = number_windows.get(number_id, OrderedDict()).copy()
    new_numbers = fetch_numbers(number_id)

    with window_lock:
        window = number_windows.setdefault(number_id, OrderedDict())
        if new_numbers:
            for num in new_numbers:
                if isinstance(num, (int, float)) and num not in window:
                    window[num] = num
                    if len(window) > WINDOW_SIZE:
                        window.popitem(last=False)

        values = list(window.values())
        avg = round(sum(values) / len(values), 2) if values else 0

    return jsonify({
        "windowPrevState": list(prev_window.keys()),
        "windowCurrState": list(window.keys()),
        "numbers": new_numbers or list(window.values()),
        "avg": avg
    })

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=9876, debug=True)