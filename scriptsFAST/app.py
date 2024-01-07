# from flask import Flask, jsonify, request
# from scripts.heatExchanger import heatExchanger
# from scripts.pipelineSim import pipelineDesign
# from scripts.batchReactor import calculateBatch
# #probably have a type depending on the algorithm 


# app = Flask(__name__)
# app.secret_key = 'wdjrfbhibjksdsdzcx'


# @app.route('/')
# def index():
#     return "dsjnjd"
# # def run_algorithm():
# #     # Assuming your script expects some data as input (JSON format)
# #     data = request.json
    
# #     # Call your algorithm function/script here with the received data
# #     calcType = "dsind" # change the calc type and let it determine the 
# #     if calcType == "hx":
# #         pass
# #         # result = heatExchanger(data)
# #     elif calcType == "pipe":
# #         # result = pipelineDesign(data)
# #         pass

# #     elif calcType == "calculate":
# #         # result = calculateBatch(data)
# #         pass

    
# #     # Return the result as a JSON response
# #     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, jsonify, request
# from flask_cors import CORS
from scripts.heatExchanger import heatExchanger
from scripts.pipelineSim import pipelineDesign
from scripts.batchReactor import calculateBatch

app = Flask(__name__)
# CORS(app)
app.secret_key = 'wdjrfbhibjksdsdzcx'

@app.route('/')
def index():
    return "Welcome"

@app.route('/run', methods=['POST'])
def run_algorithm():
    data = request.json
    if not data or 'calcType' not in data:
        return jsonify({'error': 'Invalid data or missing calcType'})

    calcType = data['calcType']
    result = None

    if calcType == "hx":
        result = heatExchanger(data)
    elif calcType == "pipe":
        result = pipelineDesign(data)
    elif calcType == "calculate":
        result = calculateBatch(data)
    else:
        return jsonify({'error': 'Invalid calcType'})

    return jsonify(result)

@app.route('/run', methods=['GET'])
def get_request():
    return jsonify({'message': 'GET request received. Please use a POST request with JSON data.'})

if __name__ == '__main__':
    app.run(debug=True)