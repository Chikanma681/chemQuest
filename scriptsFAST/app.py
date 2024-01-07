from flask import Flask, jsonify, session, request
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import time

# from flask_cors import CORS
from scripts.heatExchanger import heatExchanger
from scripts.pipelineSim import pipelineDesign
from scripts.batchReactor import calculateBatch

app = Flask(__name__)
CORS(app)
# CORS(app)
app.secret_key = 'wdjrfbhibjksdsdzcx'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Create database tables
# db.create_all()

@app.route('/')
def index():
    return "Welcome"

@app.route('/run', methods=['POST'])
def run_algorithm():
    data = request.json
    time.sleep(2)
    # if not data:
    #     return jsonify({'error': 'Invalid data or missing required fields'})

    calcType = data['calcType']
    print(data)
    result = None

    if calcType == "hx":
        ff = data['foulingFluid']
        area=data['area']
        U = data['heatCoefficient']
        Thi = data['Thi']
        Tho = data['Tho']
        Tci = data['Tci']
        Tco = data['Tco']
        print(data)
        result = heatExchanger(ff,area,U,[Thi,Tho,Tci,Tco])
        print(result)
    elif calcType == "pipe":
        result = pipelineDesign(data)
    elif calcType == "calculate":
        Ca = data['initialConcCa']
        Cb = data['initialConcCb']
        Cc = data['initialConcCc']
        k1 = data['reactionRate']
        t = data['desiredTime']
        t_desired = data['desiredTime']
        print(Ca,Cb,Cc,k1,t)
        result = calculateBatch([Ca, Cb, Cc], k1, t, t_desired)
    else:
        return jsonify({'error': 'Invalid calcType'})

    return jsonify(result)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid data or missing fields'})

    username = data['username']
    password = data['password']

    hashed_password = generate_password_hash(password)

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid data or missing fields'})

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session['logged_in'] = True
        session['username'] = username
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid username or password'})

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return jsonify({'message': 'Logged out successfully'})

if __name__ == '__main__':
    app.run(debug=True)