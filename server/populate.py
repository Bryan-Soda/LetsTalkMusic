import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'MusicApp.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)

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


def load_json(file):
    with open(file, 'r', encoding='utf-8') as f:
        return json.load(f)
    
def populate(data):
    for artist_data in data:
        exisitng = Artists.query.filter_by(name=artist_data['artist_name']).first()

        if exisitng:
            artist = exisitng
        else:
            artist = Artists(name=artist_data['artist_name'], genre=artist_data['genre'], bio=artist_data['bio'])

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
                album = Albums(artist_id=artist.id, title=album_data['title'], total_length=album_data['total_length'])
            
            db.session.add(album)
            db.session.flush()
            print(f"{album.title} added")
        # tracks
            if 'tracks' in album_data:
                tracks = album_data['tracks']
            else:
                tracks = []

            for track_data in tracks:
                exisitng = Tracks.query.filter_by(album_id=album.id, title=track_data['title']).first()

                if exisiting:
                    continue # skip for loop
                
                track = Tracks(album_id=album.id, artist_id=artist.id ,title=track_data['title'], length=track_data['length'])
                db.session.add(track)

                print(f"{track.title} added")

    db.session.commit()
    print(f'population Done')  

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        data = load_json('seed_data.json')

        populate(data)
