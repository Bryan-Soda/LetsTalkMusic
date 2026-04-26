from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import os
from flask_cors import CORS

from dotenv import load_dotenv #NOTE: Some portions require secrets. consult with others and do NOT place secrets within code plainly

load_dotenv()
admin_key = os.getenv('FLASK_ADMIN_KEY')

app = Flask(__name__)
cors = CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'Retunify.db')
app.config['SQLALCHEMY_TRACK_MODIFCATIONS'] = False
app.config['SECRET_KEY'] = str(admin_key)
admin = Admin(app, name="Retunify Admin")
db = SQLAlchemy(app)

#DB models:

#Api routes:

@app.route('/')
def index():
    return "Hello Retunify DB World!"
