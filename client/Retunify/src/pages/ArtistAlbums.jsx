import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/ArtistAlbums.css'; // Create this for square styles

const ArtistAlbums = () => {
    const { artistId } = useParams();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // GET /artists/<id> returns all albums for that artist
        fetch(`http://127.0.0.1:5000/artists/${artistId}`)
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch(err => console.error("Fetch Error:", err));
    }, [artistId]);

    return (
        <div className="discography-page">
            <div className="topbar">
                <Link to="/" className="back-link">← DISCOVER</Link>
                <div className="greeting">ALBUMS</div>
            </div>

            <div className="main-content">
                <div className="grid">
                    {albums.map((album) => (
                        <Link key={album.album_id} to={`/album/${artistId}/${album.album_id}`} className="album-link">
                            <div className="album-square-card">
                                <div className="album-square-art">
                                    <span className="album-initial">{album.album_title[0]}</span>
                                </div>
                                <div className="album-info">
                                    <div className="album-title-text">{album.album_title}</div>
                                    <div className="album-meta">{album.album_genre} • {album.track_length}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistAlbums;