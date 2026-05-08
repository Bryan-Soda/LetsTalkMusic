import React, { useState, useEffect } from 'react';
import './styles/Homepage.css';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

import AdrianneL from '../assets/AdrianneL.jpg';
import BigThief from '../assets/BigThief.jpg';
import Clario from '../assets/Clairo.jpg';
import DaftPunk from '../assets/DaftPunk.jpg';
import FleetwoodMac from '../assets/FleetwoodMac.jpg';
import FrankOcean from '../assets/FrankOcean.jpg';
import Halsey from '../assets/Halsey.jpg';
import KendrickLamar from '../assets/KendrickLamar.jpg';
import Lorde from '../assets/Lorde.jpg';
import MalcolmTodd from '../assets/MalcolmTodd.jpg';
import MichaelJackson from '../assets/MichaelJackson.jpg';
import MJLenderman from '../assets/MJLenderman.jpg';
import PinkPantheress from '../assets/PinkPanthress.jpg'; // Matches your filename typo
import RadioHead from '../assets/RadioHead.jpg';
import SabrinaC from '../assets/SabrinaC.jpg';
import SZA from '../assets/SZA.jpg';
import TameImpala from '../assets/TameImpala.jpg';
import TheMarias from '../assets/TheMarias.jpg';
import TylerTheCreator from '../assets/TylerTheCreator.jpg';
import YumiZouma from '../assets/YumiZouma.jpg';

const artistImageMap = {
  "Adrianne Lenker": AdrianneL,
  "Big Thief": BigThief,
  "Clario": Clario,
  "Daft Punk": DaftPunk,
  "Fleetwood Mac": FleetwoodMac,
  "Frank Ocean": FrankOcean,
  "Halsey": Halsey,
  "Kendrick Lamar": KendrickLamar,
  "Lorde": Lorde,
  "Malcolm Todd": MalcolmTodd,
  "Michael Jackson": MichaelJackson,
  "MJ Lenderman": MJLenderman,
  "PinkPantheress": PinkPantheress,
  "Radiohead": RadioHead,
  "Sabrina Carpenter": SabrinaC,
  "SZA": SZA,
  "Tame Impala": TameImpala,
  "The Marias": TheMarias,
  "Tyler, The Creator": TylerTheCreator,
  "Yumi Zouma": YumiZouma
};

function ArtistCard({ artist }) {
  const [hovered, setHovered] = useState(false);
  
  const colors = ['#d4a853', '#2d6a4f', '#5e4b8b', '#c9a14a', '#b5c4d1', '#8b3a3a', '#4a7c59', '#c2a8d0'];
  const artistColor = colors[artist.id % colors.length];

  // Try to find the image in our map
  const imageAsset = artistImageMap[artist.artist_name];

  return (
    <Link to={`/artists/${artist.id}`} className="artist-card-link">
      <div
        className="artist-card-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="album-art" 
          style={{
            /* Use the image from the map if it exists, otherwise use gradient */
            background: imageAsset 
              ? `url(${imageAsset}) center/cover no-repeat` 
              : `linear-gradient(135deg, ${artistColor}cc, ${artistColor}66)`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {hovered && (
            <div className="album-overlay">
               <span className="view-text">VIEW ALBUMS</span>
            </div>
          )}
        </div>

        <div className="artist-label">
          <span className="artist-name-text">{artist.artist_name}</span>
          <span className="artist-genre-text">{artist.genre}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Homepage() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetch('http://127.0.0.1:5000/artists')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArtists(data);
        }
      })
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  const totalPages = Math.ceil(artists.length / PAGE_SIZE);
  const paginatedArtists = artists.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="homepage">
      <div className="topbar">
        <div>
          <div className="greeting">LetsTalkMusic!</div>
        </div>
        <div className="avatar">J</div>
      </div>

      <div className="main-content">
        <div className="section-header">
          <div className="section-title">Explore these Artists!</div>
          <button className="see-all-btn">See all</button>
        </div>
        
        <div className="grid">
          {paginatedArtists.length > 0 ? (
            paginatedArtists.map((artist) => (
              <div key={artist.id} className="grid-item">
                <ArtistCard artist={artist} />
              </div>
            ))
          ) : (
            <div style={{ color: '#8a8a8a', padding: '20px' }}>No artists found. Check backend connection...</div>
          )}
        </div>

        {paginatedArtists.length > 0 && (
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              sx={{
                '& .MuiPaginationItem-root': { color: '#8a8a8a', borderColor: '#2a2a2a' },
                '& .MuiPaginationItem-root:hover': { borderColor: '#00e544', color: '#00e544' },
                '& .Mui-selected': { backgroundColor: '#00e544 !important', color: '#000 !important' },
              }}
              variant="outlined"
              shape="rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}