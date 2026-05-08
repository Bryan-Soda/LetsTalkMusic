import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/ArtistAlbums.css';

export default function ArtistAlbums() {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");

  // Color palette for dynamic square backgrounds
  const colors = ['#d4a853', '#2d6a4f', '#5e4b8b', '#c9a14a', '#b5c4d1', '#8b3a3a', '#4a7c59', '#c2a8d0'];

  useEffect(() => {
    // Note: Fetching from the /albums sub-route
    fetch(`http://127.0.0.1:5000/artists/${artistId}/albums`)
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data)) {
          setAlbums(data);
          // Set artist name from the first album object if available
          if (data.length > 0 && data[0].artist_name) {
            setArtistName(data[0].artist_name);
          }
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [artistId]);

  return (
    <div className="artist-albums-page">
      <div className="topbar">
        <Link to="/" className="back-link" style={{color: '#00e544', textDecoration: 'none'}}>← BACK</Link>
        <div className="greeting">{artistName ? `${artistName.toUpperCase()}` : "ALBUMS"}</div>
        <div className="avatar">J</div>
      </div>

      <div className="main-content">
        <div className="grid">
          {albums.length > 0 ? (
            albums.map((album) => {
              // Pick a color based on album ID
              const albumColor = colors[album.album_id % colors.length];
              
              return (
                <Link 
                  key={album.album_id} 
                  to={`/album/${artistId}/${album.album_id}`} 
                  className="album-link"
                >
                  <div className="album-square-card">
                    <div 
                      className="album-square-art"
                      style={{
                        background: `linear-gradient(135deg, ${albumColor}cc, ${albumColor}66)`,
                        borderRadius: '12px'
                      }}
                    >
                    </div>
                    <div className="album-info">
                      <div className="album-title-text">{album.album_title}</div>
                      <div className="album-meta">{album.total_length}</div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div style={{color: '#8a8a8a', textAlign: 'center', width: '100%', marginTop: '50px'}}>
              No albums found for this artist.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}