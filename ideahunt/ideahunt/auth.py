from flask import jsonify, request
from flask_login import login_user, logout_user

from ideahunt.models import User, db


def register():
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    confirm = request.json.get("confirm", None)
    if not username:
        return jsonify({"message": "Username is required."}), 400
    if not name:
        return jsonify({"message": "Name is required."}), 400
    if not email:
        return jsonify({"message": "Email is required."}), 400
    if not password:
        return jsonify({"message": "Password is required."}), 400
    if not confirm:
        return jsonify({"message": "Password confirmation is required."}), 400
    if password != confirm:
        return jsonify({"message": "Passwords do not match"}), 400

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"message": "User already exists."}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Email already exists."}), 400

    user = User(username=username, name=name, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    login_user(user)
    return jsonify(message="Successfully registered!"), 200


def login():
    print(request)
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if not username:
        return jsonify({"message": "Username is required."}), 400
    if not password:
        return jsonify({"message": "Password is required."}), 400

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "User not found."}), 400

    if not user.check_password(password):
        return jsonify({"message": "Invalid password."}), 400

    login_user(user)
    return jsonify(message="Successfully logged in!"), 200


def logout():
    """Log user out"""
    logout_user()
    return jsonify(message="Successfully logged out"), 200
