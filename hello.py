import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
	pass
    #return 'Hello World!'
