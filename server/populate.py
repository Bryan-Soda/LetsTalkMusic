import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'MusicApp.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False) # 'a' = admin, 'u'=user

    reviews = db.relationship('Reviews', backref='user')
    # May need some relations down the line
    #   > Stored data for user's analytics, etc.

    # May need to store some webapi tokens for the user's spotify to be able to login?

class Artists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    genre = db.Column(db.String, nullable=False)
    
    albums = db.relationship('Albums', backref='artist')

class Albums(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False) 
    title = db.Column(db.String, nullable=False)
    # genre = db.Column(db.String, nullable=False)
    total_length = db.Column(db.String, nullable=False)

    tracks = db.relationship('Tracks', backref='album')
    synopsis = db.Column(db.String, nullable=False)
class Tracks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False) 
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)  
    title = db.Column(db.String, nullable=False) 
    length = db.Column(db.String, nullable=False) #denote the track length

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # artist_id = db.Column(db.Integer, db.ForeignKey('artist_id')) Will we need this????
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)  
    review = db.Column(db.String(255))
    rating = db.Column(db.Float, nullable=False)

    album = db.relationship('Albums', backref='reviews')

def load_json(file):
    with open(file, 'r', encoding='utf-8') as f:
        return json.load(f)
    
def populate(data):
    for artist_data in data:
        exisitng = Artists.query.filter_by(name=artist_data['artist_name']).first()

        if exisitng:
            artist = exisitng
        else:
            artist = Artists(name=artist_data['artist_name'], genre=artist_data['genre'])

        db.session.add(artist)
        db.session.flush()
        print(f"{artist.name} added")
    # albums
        if 'albums' in artist_data:
            albums = artist_data['albums']
        else:
            albums = []

        for album_data in albums:
            exisiting = Albums.query.filter_by(artist_id=artist.id, title=album_data['title']).first()

            if exisiting:
                album = exisiting
            else:
                album = Albums(artist_id=artist.id, title=album_data['title'], total_length=album_data['total_length'], synopsis=album_data.get('synopsis'))
            
            db.session.add(album)
            db.session.flush()
            print(f"{album.title} added")
        # tracks
            if 'tracks' in album_data:
                tracks = album_data['tracks']
            else:
                tracks = []

            for track_data in tracks:
                exisiting = Tracks.query.filter_by(album_id=album.id, title=track_data['title']).first()

                if exisiting:
                    continue # skip for loop
                
                track = Tracks(album_id=album.id, artist_id=artist.id ,title=track_data['title'], length=track_data['length'])
                db.session.add(track)

                print(f"{track.title} added")

    db.session.commit()
    print(f'Populating DB Done')  

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        data = load_json('seed_data.json')

        populate(data)
