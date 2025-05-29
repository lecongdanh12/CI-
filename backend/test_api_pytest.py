import requests
import os

BASE_URL = os.getenv("API_BASE", "http://localhost:4000")

# --- AUTH TESTS ---
def test_signup_success():
    payload = {"email": "pytestuser@example.com", "password": "pytest123", "passwordConfirm": "pytest123"}
    r = requests.post(f"{BASE_URL}/auth/register", json=payload)
    print('SIGNUP:', r.status_code, r.text)
    assert r.status_code in [200, 201, 400]  # 400 nếu user đã tồn tại
    if r.status_code in [200, 201]:
        assert "user" in r.json() or "_id" in r.json().get("user", {})


def test_signin_success():
    payload = {"email": "pytestuser@example.com", "password": "pytest123"}
    r = requests.post(f"{BASE_URL}/auth/login", json=payload)
    print('SIGNIN SUCCESS:', r.status_code, r.text)
    assert r.status_code == 200
    data = r.json()
    assert "accessToken" in data or "user" in data
    if "user" in data:
        assert data["user"].get("email") == "pytestuser@example.com"


def test_signin_fail():
    payload = {"email": "pytestuser@example.com", "password": "sai"}
    r = requests.post(f"{BASE_URL}/auth/login", json=payload)
    print('SIGNIN FAIL:', r.status_code, r.text)
    assert r.status_code == 401 or r.status_code == 400

# --- PRODUCT TESTS ---
def test_get_products():
    r = requests.get(f"{BASE_URL}/product")
    assert r.status_code == 200
    assert isinstance(r.json(), list)

def test_create_product_fail_unauth():
    payload = {"title": "pytest", "description": "pytest", "price": 1, "photos": ["http://img.com/1.jpg"]}
    r = requests.post(f"{BASE_URL}/product", json=payload)
    assert r.status_code in [401, 403]

# --- ORDER TESTS ---
def test_get_orders_unauth():
    r = requests.get(f"{BASE_URL}/order")
    assert r.status_code in [401, 403]
