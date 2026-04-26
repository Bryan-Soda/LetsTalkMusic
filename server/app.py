from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import os
from flask_cors import CORS
import bcrypt #used for hashing passwords

from dotenv import load_dotenv #NOTE: Some portions require secrets. consult with others and do NOT place secrets within code plainly


#salt for encryption
salt = bcrypt.gensalt()


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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    # May need some relations down the line
    #   > Stored data for user's analytics, etc.



#Api routes:

@app.route('/')
def index():
    return "Hello Retunify DB World!"

#Add new user (check if valid email, user, etc)
@app.route('/user', methods=['POST'])
def add_new_member():
    data = request.get_json()
    if not data:
        return {'error': 'data required'}, 400
    print("Raw data:", data) #testing purposes
    if 'name' not in data or 'password' not in data:
        return {'error': 'username and password required'}, 400
    if len(data['password']) < 12:
        return {'error': 'password must be at least 12 characters long'}, 400

    name = data['name'] #frontend must return a json/dict with the key-names 'name' and 'password'
    
    user = User.query.filter_by(username=name).first()
    if user is not None:
        return {'error': 'user already exists!'}, 400
    
    hashed_pass = bcrypt.hashpw(data['password'], salt)
    
    new_user = User(username=name, password=hashed_pass)

    db.session.add(new_user)
    db.session.commit()

    return {'Success': f'User {name} added'}

#Authenticate the user is a member
@app.route('/auth')
def authenticate():
    pass

if __name__ == "__main__":
    app.run(debug=True)