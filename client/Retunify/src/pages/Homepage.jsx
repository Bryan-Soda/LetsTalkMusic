import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Homepage.css';
import { 
  Pagination, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';

import AdrianneL from '../assets/ArtistImages/AdrianneL.jpg';
import BigThief from '../assets/ArtistImages/BT.jpg'; 
import Clairo from '../assets/ArtistImages/Clairo.jpg';
import DaftPunk from '../assets/ArtistImages/DaftPunk.jpg';
import FleetwoodMac from '../assets/ArtistImages/FM.jpg'; 
import FrankOcean from '../assets/ArtistImages/FrankOcean.jpg';
import Halsey from '../assets/ArtistImages/Halsey.jpg';
import KendrickLamar from '../assets/ArtistImages/KendrickLamar.jpg';
import Lorde from '../assets/ArtistImages/Lorde.jpg';
import MalcolmTodd from '../assets/ArtistImages/MalcolmTodd.jpg';
import MichaelJackson from '../assets/ArtistImages/MJ.jpg'; 
import MJLenderman from '../assets/ArtistImages/MJLenderman.jpg';
import PinkPantheress from '../assets/ArtistImages/PP.jpg'; 
import RadioHead from '../assets/ArtistImages/RH.jpg'; 
import SabrinaC from '../assets/ArtistImages/SabrinaC.jpg';
import SZA from '../assets/ArtistImages/SZA.jpg';
import TameImpala from '../assets/ArtistImages/TameImpala.jpg';
import TheMarias from '../assets/ArtistImages/TheMarias.jpg';
import TylerTheCreator from '../assets/ArtistImages/TylerTheCreator.jpg';
import YumiZouma from '../assets/ArtistImages/YZ.jpg'; 
import hollis from '../assets/ArtistImages/2hollis.png'
import badbunny from '../assets/ArtistImages/badbunny.png'
import madvill from '../assets/ArtistImages/madvillain.png'

const artistImageMap = {
  "Adrianne Lenker": AdrianneL,
  "Big Thief": BigThief,
  "Clairo": Clairo,
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
  "Yumi Zouma": YumiZouma,
  "2hollis": hollis,
  "Bad Bunny": badbunny,
  "Madvillain": madvill,
};

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
};

function ArtistCard({ artist }) {
  const [hovered, setHovered] = useState(false);
  const colors = ['#d4a853', '#2d6a4f', '#5e4b8b', '#c9a14a', '#b5c4d1', '#8b3a3a', '#4a7c59', '#c2a8d0'];
  const artistColor = colors[artist.id % colors.length];
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
  const API = "http://127.0.0.1:5000";
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const username = localStorage.getItem('username') || "Guest";
  const avatarColor = stringToColor(username);

  const handleSignOut = () => {
    localStorage.clear(); 
    navigate("/");        
  };

  const handleProfile = () => {
    navigate("/profile/:userId");
  }

  useEffect(() => {
    fetch(`${API}/artists`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArtists(data);
        }
      })
      .catch(error => console.error('Error fetching artists:', error));
  }, [API]);

  // Frontend local filtering logic
  const filteredArtists = artists.filter((artist) =>
    artist.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtists.length / PAGE_SIZE);
  const paginatedArtists = filteredArtists.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="homepage">
      <Dialog 
        open={isPopupOpen} 
        onClose={() => setPopupOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1a1a1a', 
            color: 'white',
            borderRadius: '15px',
            border: '1px solid #2a2a2a',
            padding: '10px'
          },
        }}
      >
        <DialogTitle sx={{ color: '#00e544', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Welcome to LetsTalkMusic!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            LetsTalkMusic is your personal music logging and discovery platform.
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            What can YOU do here?
          </Typography>
          <Typography variant="body2" sx={{ color: '#8a8a8a', lineHeight: '1.6' }}>
            • Explore NEW artists or find your favorites.<br/>
            • VIEW album reviews from others or CREATE your own.<br/>
            • Click the help button anytime to see these instructions again!<br/>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '20px' }}>
          <Button 
            onClick={() => setPopupOpen(false)} 
            sx={{ 
              backgroundColor: '#00e544', 
              color: 'black', 
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#00c139' },
              borderRadius: '8px',
              px: 3
            }}
          >
            LET'S GO!
          </Button>
        </DialogActions>
      </Dialog>

      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="greeting">LetsTalkMusic!</div>
          
          <Button 
            onClick={() => setPopupOpen(true)} 
            variant="outlined"
            sx={{ 
              color: '#00e544', 
              borderColor: 'rgba(0, 229, 68, 0.5)',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              padding: '2px 10px',
              '&:hover': { 
                borderColor: '#00e544', 
                backgroundColor: 'rgba(0, 229, 68, 0.05)' 
              } 
            }}
          >
            What can I do here?
          </Button>

          <Button 
            variant="outlined" 
            onClick={handleSignOut}
            sx={{ 
              color: '#ff4444', 
              borderColor: '#ff4444',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.80rem',
              padding: '2px 10px',
              '&:hover': { 
                borderColor: '#cc0000', 
                backgroundColor: 'rgba(255, 68, 68, 0.05)' 
              } 
            }}
          >
            Sign Out
          </Button>
        </div>
        
        <div 
          className="avatar" 
          style={{ 
            backgroundColor: avatarColor, 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.1)',
            width: '55px',
            height: '35px'
          }}
          onClick={handleProfile}
        >
        Profile
        </div>
      </div>

      <div className="main-content">
        <div className="search-container" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search for an artist..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset pagination on search
            }}
            sx={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: '#2a2a2a' },
                '&:hover fieldset': { borderColor: '#00e544' },
                '&.Mui-focused fieldset': { borderColor: '#00e544' },
              },
            }}
          />
        </div>

        <div className="section-header">
          <div className="section-title">Explore these Artists!</div>
        </div>
        
        <div className="grid" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}
        >
          {paginatedArtists.length > 0 ? (
            paginatedArtists.map((artist) => (
              <div key={artist.id} className="grid-item">
                <ArtistCard artist={artist} />
              </div>
            ))
          ) : (
            <div style={{ color: '#8a8a8a', padding: '20px' }}>
              {searchTerm ? "No artists match your search." : "No artists found. Check backend connection..."}
            </div>
          )}
        </div>

        {paginatedArtists.length > 0 && (
          <div className="pagination" style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
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