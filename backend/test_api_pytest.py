import requests
import os

BASE_URL = os.getenv("API_BASE", "http://localhost:10000")

# --- AUTH TESTS ---
def test_signup_success():
    payload = {"email": "pytestuser@example.com", "password": "pytest123", "passwordConfirm": "pytest123"}
    r = requests.post(f"{BASE_URL}/auth/register", json=payload)
    assert r.status_code in [200, 201, 400]  # 400 nếu user đã tồn tại

def test_signin_success():
    payload = {"email": "pytestuser@example.com", "password": "pytest123"}
    r = requests.post(f"{BASE_URL}/auth/login", json=payload)
    assert r.status_code == 200
    assert "accessToken" in r.json() or "user" in r.json()

def test_signin_fail():
    payload = {"email": "pytestuser@example.com", "password": "sai"}
    r = requests.post(f"{BASE_URL}/auth/login", json=payload)
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
