from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import os
from flask_cors import CORS
import bcrypt #used for hashing passwords

from dotenv import load_dotenv #NOTE: Some portions require secrets. consult with others and do NOT place secrets within code plainly

load_dotenv()
admin_key = os.getenv('FLASK_ADMIN_KEY')

app = Flask(__name__)
cors = CORS(app, origins='*')

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'MusicApp.db')
app.config['SQLALCHEMY_TRACK_MODIFCATIONS'] = False
app.config['SECRET_KEY'] = str(admin_key)
admin = Admin(app, name="MusicApp Admin")
db = SQLAlchemy(app)

#DB models:

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False) # 'a' = admin, 'u'=user
    # May need some relations down the line
    #   > Stored data for user's analytics, etc.

    # May need to store some webapi tokens for the user's spotify to be able to login?

class Artists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    genre = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, unique=True)

    albums = db.relationship('Albums', backref='artist')

class Albums(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False) 
    title = db.Column(db.String, nullable=False)
    # genre = db.Column(db.String, nullable=False)
    total_length = db.Column(db.String, nullable=False)

    tracks = db.relationship('Tracks', backref='album')
    # synopsis = db.Column(db.String, nullable=False)
class Tracks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False) 
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)  
    title = db.Column(db.String, nullable=False) 
    length = db.Column(db.String, nullable=False) #denote the track length

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)  
    review = db.Column(db.String(255))
    rating = db.Column(db.Float, nullable=False)

#Api routes:

@app.route('/')
def index():
    return "Hello MusicApp DB World!"

#Add new user (check if valid email, user, etc) Note: Currently only checks if user is valid
@app.route('/user', methods=['POST'])
def add_new_member():
    data = request.get_json()
    if not data:
        return {'error': 'data required'}, 400
    print("Raw data:", data) #testing purposes
    if 'username' not in data or 'password' not in data:
        return {'error': 'username and password required'}, 400
    if len(data['password']) < 12:
        return {'error': 'password must be at least 12 characters long'}, 400

    name = data['username'] #frontend must return a json/dict with the key-names 'name' and 'password'

    user = Users.query.filter_by(username=name).first()
    if user is not None:
        return {'error': 'user already exists!'}, 400
    
    #salt for encryption
    salt = bcrypt.gensalt()

    password_bytes = data['password'].encode('utf-8')
    hashed_pass = bcrypt.hashpw(password_bytes, salt)
    
    new_user = Users(username=name, password=hashed_pass)
    
    print()
    db.session.add(new_user)
    db.session.commit()

    return {'Success': f'User {name} added'}

#Authenticate the user is a member, admin, or mod (SIDE A.K.A NOT PRIORITY RN)
@app.route('/auth')
def authenticate():
    # Types: Users and Admins and Mods
    pass

@app.route('/artists', methods=['GET'])
def get_all_artists():
    results = []

    artists = Artists.query.all()

    for a in artists:
        results.append({
            "id": a.id,
            "artist_name": a.name,
            "genre": a.overall_genre,
            "bio": a.bio,
        })
    
    return jsonify(results), 200

@app.route('/artists/<int:artist_id>', methods=['GET'])
def get_artist(artist_id):
    # Gets the a particular artist's genre, bio, etc.

    results = []

    artist = Artists.query.get(artist_id)

    results.append({
            "id": artist.id,
            "artist_name": artist.name,
            "genre": artist.overall_genre,
            "bio": artist.bio,
        })
    
    return jsonify(results), 200

@app.route('/artists/<int:artist_id>/albums', methods=['GET'])
def get_artist_albums(artist_id):
    # Gets all albums from artist.
    artist = Artists.query.get(artist_id)

    if artist is None:
        return {'error': 'artist not found'}, 404

    results = []

    #gathers all albums from artist and their details
    for albums in artist.albums:
        results.append({
            "album_id": albums.id,
            "album_title": albums.title,
            "album_genre": albums.genre,
            "track_length": albums.total_length,
        })

    return jsonify(results), 200

@app.route('/artists/<int:artist_id>/<int:album_id>')
def get_artist_album(artist_id, album_id):
    # Gets a specific album's tracks, genre, etc.
    artist = Artists.query.get(artist_id)

    if artist is None:
        return {'error': 'artist not found'}, 404
    
    album = Albums.query.get(album_id)

    if album is None:
        return {'error':'album not found'}, 404

    if album.artist_id != artist_id:
        return {'error':"not artist's album"}, 400 

    results = []

    results.append({
        "album_id": album_id,
        "album_title": album.title,
        "album_genre": album.genre,
        "track_length": album.total_length,
    })
    return jsonify(results), 200

@app.route('/artists/<int:artist_id>/<int:album_id>/<int:track_id>')
def get_album_tracks():
    # Gets a specific track's info
    pass


# tabs for flask-admin
admin.add_view(ModelView(Users,db.session))
admin.add_view(ModelView(Artists,db.session))
admin.add_view(ModelView(Albums,db.session))
admin.add_view(ModelView(Tracks,db.session))
admin.add_view(ModelView(Reviews,db.session))

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)