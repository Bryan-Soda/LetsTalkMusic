import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const AlbumTracks = () => {
    const { artistId, albumId } = useParams();
    const [albumData, setAlbumData] = useState(null);

    useEffect(() => {
        // GET /artists/<id>/<id> returns specific album info
        fetch(`http://127.0.0.1:5000/artists/${artistId}/${albumId}`)
            .then(res => res.json())
            .then(data => setAlbumData(data[0])) // Backend returns a list [item]
            .catch(err => console.error(err));
    }, [artistId, albumId]);

    if (!albumData) return <div className="loading">LOADING SYSTEM...</div>;

    return (
        <div className="album-tracks-page" style={{ padding: '40px', backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
            <Link to={`/artist/${artistId}`} style={{ color: '#00e544', textDecoration: 'none' }}>← BACK TO DISCOGRAPHY</Link>
            
            <header style={{ marginTop: '20px' }}>
                <h1 style={{ fontSize: '3rem' }}>{albumData.album_title}</h1>
                <p style={{ color: '#8a8a8a' }}>{albumData.album_genre} • Total Length: {albumData.track_length}</p>
            </header>

            <section className="tracks-list" style={{ marginTop: '40px' }}>
                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>TRACKLIST</h3>
                {/* Once tracks are added to seed_data and app.py, map them here */}
                <div style={{ color: '#00e544', padding: '10px 0' }}>
                    <p>Tracklisting logic placeholder...</p>
                </div>
            </section>
        </div>
    );
};

export default AlbumTracks;