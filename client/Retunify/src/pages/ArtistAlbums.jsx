import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/ArtistAlbums.css';

// Import Album Covers
import Blonde from '../assets/AlbumCovers/Blonde.jpg';
import BrightFuture from '../assets/AlbumCovers/BrightFuture.jpg';
import Chromakopia from '../assets/AlbumCovers/Chromakopia.jpg';
import Cinema from '../assets/AlbumCovers/CINEMA.jpg';
import Ctrl from '../assets/AlbumCovers/CTRL.jpg';
import Currents from '../assets/AlbumCovers/Currents.jpg';
import EP3 from '../assets/AlbumCovers/EP3.jpg';
import FancyThat from '../assets/AlbumCovers/FancyThat.jpg';
import GoodKidMadCity from '../assets/AlbumCovers/GoodKidMadCity.jpg';
import Immunity from '../assets/AlbumCovers/Immunity.jpg';
import InRainbows from '../assets/AlbumCovers/InRainbows.jpg';
import ManningFireworks from '../assets/AlbumCovers/ManningFireworks.jpg';
import Melodrama from '../assets/AlbumCovers/Melodrama.jpg';
import OffTheWall from '../assets/AlbumCovers/OffTheWall.jpg';
import RandomAccessMemories from '../assets/AlbumCovers/RandomAccessMemories.jpg';
import Rumours from '../assets/AlbumCovers/Rumours.jpg';
import ShortAndSweet from '../assets/AlbumCovers/ShortAndSweet.jpg';
import Submarine from '../assets/AlbumCovers/Submarine.jpg';
import SuperCleanVol1 from '../assets/AlbumCovers/SuperCleanVol1.jpg';
import SweetBoy from '../assets/AlbumCovers/SweetBoy.jpg';
import TheGreatImpersonator from '../assets/AlbumCovers/TheGreatImpersonator.jpg';
import Thriller from '../assets/AlbumCovers/Thriller.jpg';
import ToHellWithIt from '../assets/AlbumCovers/tohellwithit.jpg';
import TwoHands from '../assets/AlbumCovers/TwoHands.jpg';

const albumCoverMap = {
  "Blonde": Blonde,
  "Bright Future": BrightFuture,
  "CHROMAKOPIA": Chromakopia,
  "CINEMA": Cinema,
  "CTRL": Ctrl,
  "Currents": Currents,
  "EP III": EP3,
  "Fancy That": FancyThat,
  "Good Kid, M.A.A.D City": GoodKidMadCity,
  "Immunity": Immunity,
  "In Rainbows": InRainbows,
  "Manning Fireworks": ManningFireworks,
  "Melodrama": Melodrama,
  "Off the Wall": OffTheWall,
  "Random Access Memories": RandomAccessMemories,
  "Rumours": Rumours,
  "Short n' Sweet": ShortAndSweet,
  "Submarine": Submarine,
  "Superclean": SuperCleanVol1,
  "Sweet Boy": SweetBoy,
  "The Great Impersonator": TheGreatImpersonator,
  "Thriller": Thriller,
  "to hell with it": ToHellWithIt,
  "Two Hands": TwoHands
};

export default function ArtistAlbums() { 
  const api = "http://127.0.0.1:5000";
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");

  const colors = ['#d4a853', '#2d6a4f', '#5e4b8b', '#c9a14a', '#b5c4d1', '#8b3a3a', '#4a7c59', '#c2a8d0'];

  useEffect(() => {
    fetch(`${api}/artists/${artistId}/albums`)
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setAlbums(data);
          if (data.length > 0 && data[0].artist_name) {
            setArtistName(data[0].artist_name);
          }
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [artistId]);

  return (
    <div className="artist-albums-page">
      <div className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left side: Back link */}
        <Link 
          to="/home" 
          className="back-link" 
          style={{ color: '#00e544', textDecoration: 'none', width: '80px' }}
        >
          ← BACK
        </Link>

        {/* Center: Artist Name */}
        <div className="greeting" style={{ flex: 1, textAlign: 'center' }}>
          {artistName ? artistName.toUpperCase() : "ALBUMS"}
        </div>

        {/* Right side: Spacer for balance */}
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="main-content">
        <div className="grid">
          {albums.length > 0 ? (
            albums.map((album) => {
              const albumColor = colors[album.album_id % colors.length];
              const hardcodedCover = albumCoverMap[album.album_title];
              
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
                        background: hardcodedCover 
                          ? `url(${hardcodedCover}) center/cover no-repeat` 
                          : `linear-gradient(135deg, ${albumColor}cc, ${albumColor}66)`,
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