# dependencies
from flask import Flask, jsonify, render_template
import json
from pymongo import MongoClient

# setup mongo connection
conn = "mongodb://localhost:27017"
client = MongoClient(conn)


#################################################
# Database Setup
#################################################
# connect to mongo db and collection
db = client.eia_db
total_energy = db.total_energy


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<h4>Available Routes:</h4>"
        f'<a href="/api/v1.0">/api/v1.0</a><br/>'  
     ) 

@app.route("/api/v1.0")
def show_apis():
    """List all available api routes."""
    return (
        f"<h4>Available Routes:</h4>"
        f'<a href="/api/v1.0/total_energy">/api/v1.0/total_energy</a><br/>'       

    )    

@app.route("/api/v1.0/total_energy")
def get_total_energy():
    # data = total_energy.find_one('consumption') # To select one id of data
    data = list(total_energy.find())  # To look at all data
    return jsonify(data)

# @app.route("/api/v1.0/info")
# def get_all_user_results():
#     return jsonify(data.get_data_by_user())    

# @app.route("/api/v1.0/info/<subject_id>")
# def get_one_user_results(subject_id):
#     return jsonify(data.get_data_by_user(subject_id))    

# @app.route("/api/v1.0/subjects")
# def get_all_subjects():
#     return jsonify(data.get_subjects())

# @app.route("/api/v1.0/subjects/<subject_id>")
# def get_one_subject(subject_id):
#     return jsonify(data.get_subjects(subject_id))



if __name__ == '__main__':
    app.run(debug=True)