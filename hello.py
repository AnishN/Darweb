import os
from flask import Flask
from flask import render_template
from flask import url_for

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/hello')
def hello():
    pass
    #return 'Hello World'

with app.test_request_context():
	pass
	#url_for('static', filename='main.css')
    
if __name__ == '__main__':
    app.run()
