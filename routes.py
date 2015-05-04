import os
from flask import Flask
from flask import render_template
from flask import url_for
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/natural-selection')
def natural_selection():
	return render_template("natural-selection.html")

@app.route('/genetic-drift')
def genetic_drift():
	return render_template("genetic-drift.html")

@app.route('/mean-fitness')
def mean_fitness():
	return render_template("mean-fitness.html")
	
@app.route('/selection-drift')
def selection_drift():
	return render_template("selection-drift.html")

@app.route('/drift-mutation')
def drift_mutation():
	return render_template("drift-mutation.html")

@app.route('/drift-migration')
def drift_migration():
	return render_template("drift-migration.html")
    
if __name__ == '__main__':
    app.run()
