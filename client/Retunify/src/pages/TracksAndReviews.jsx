import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Typography, Paper, List, ListItem, Divider } from '@mui/material';
import './styles/TracksAndReviews.css';

// Import local album covers
import Blonde from '../assets/AlbumCovers/Blonde.jpg';
import SweetBoy from '../assets/AlbumCovers/SweetBoy.jpg';
import BrightFuture from '../assets/AlbumCovers/BrightFuture.jpg';
import Chromakopia from '../assets/AlbumCovers/Chromakopia.jpg';
import Cinema from '../assets/AlbumCovers/CINEMA.jpg';
import Submarine from '../assets/AlbumCovers/Submarine.jpg';
import Superclean from '../assets/AlbumCovers/SupercleanVol1.jpg';
import CTRL from '../assets/AlbumCovers/CTRL.jpg';
import Currents from '../assets/AlbumCovers/Currents.jpg';
import EP3 from '../assets/AlbumCovers/EP3.jpg';
import FancyThat from '../assets/AlbumCovers/FancyThat.jpg';
import tohellwithit from '../assets/AlbumCovers/tohellwithit.jpg';
import GoodKidMadCity from '../assets/AlbumCovers/GoodKidMadCity.jpg';
import Immunity from '../assets/AlbumCovers/Immunity.jpg';
import InRainbows from '../assets/AlbumCovers/InRainbows.jpg';
import ManningFireworks from '../assets/AlbumCovers/ManningFireworks.jpg';
import Melodrama from '../assets/AlbumCovers/Melodrama.jpg';
import OffTheWall from '../assets/AlbumCovers/OffTheWall.jpg';
import Thriller from '../assets/AlbumCovers/Thriller.jpg';
import TwoHands from '../assets/AlbumCovers/TwoHands.jpg';
import TheGreatImpersonator from '../assets/AlbumCovers/TheGreatImpersonator.jpg';
import RAM from '../assets/AlbumCovers/RandomAccessMemories.jpg';
import Rumours from '../assets/AlbumCovers/Rumours.jpg';
import ShortAndSweet from '../assets/AlbumCovers/ShortAndSweet.jpg';

// Map for specific album covers using the album_title as the key
const albumCoverMap = {
  "Blonde": Blonde,
  "Sweet Boy": SweetBoy,
  "Bright Future": BrightFuture,
  "CHROMAKOPIA": Chromakopia,
  "CINEMA": Cinema,
  "Submarine": Submarine,
  "Superclean": Superclean,
  "CTRL": CTRL,
  "Currents": Currents,
  "EP III": EP3,
  "Fancy That": FancyThat,
  "to hell with it": tohellwithit,
  "Good Kid, M.A.A.D City": GoodKidMadCity,
  "Immunity": Immunity,
  "In Rainbows": InRainbows,
  "Manning Fireworks": ManningFireworks,
  "Melodrama": Melodrama,
  "Off the Wall": OffTheWall,
  "Thriller": Thriller,
  "Two Hands": TwoHands,
  "The Great Impersonator": TheGreatImpersonator,
  "Random Access Memories": RAM,
  "Rumours": Rumours,
  "Short n' Sweet": ShortAndSweet
};

export default function TracksAndReviews() {
  const { artistId, albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/artists/${artistId}/${albumId}`)
      .then(res => res.json())
      .then(data => {
        // Handle both array and single object responses from Flask
        if (Array.isArray(data) && data.length > 0) setAlbumData(data[0]);
        else setAlbumData(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [artistId, albumId]);

  if (!albumData) return <div className="loading">Loading...</div>;

  // Retrieve the correct cover from the map
  const displayCover = albumCoverMap[albumData.album_title] || "https://via.placeholder.com/400";

  return (
    <div className="tracks-reviews-page">
      <div className="topbar">
        <Link to={`/artists/${artistId}`} className="back-link">← BACK</Link>
        <div className="greeting">
          {albumData.album_title ? albumData.album_title.toUpperCase() : "ALBUM"}
        </div>
        <div className="avatar">J</div>
      </div>

      <div className="main-content">
        <Typography variant="subtitle1" className="album-meta-subtitle">
          {albumData.artist_name} | Total Album Length: {albumData.total_length} |
        </Typography>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Left Column: Tracklist */}
          <Grid item xs={12} md={5}>
            <Typography variant="overline" className="column-label">Tracklist</Typography>
            <Paper elevation={0} className="scrollable-panel" sx={{ maxHeight: '600px', overflowY: 'auto' }}>
              <List disablePadding>
                {albumData.tracks?.map((track, index) => (
                  <React.Fragment key={track.track_id}>
                    <ListItem sx={{ py: 2 }}>
                      <div className="track-row">
                        <span className="track-name-grey">
                          {index + 1}. {track.track_title}
                        </span>
                        <span className="track-duration-grey">
                          {track.track_length}
                        </span>
                      </div>
                    </ListItem>
                    {index < albumData.tracks.length - 1 && <Divider className="track-divider" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column: Centered Album Art & Synopsis */}
          <Grid 
            item 
            xs={12} 
            md={7} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start' 
            }}
          >
            <Typography variant="overline" className="column-label" sx={{ alignSelf: 'flex-start' }}>
              Album Details
            </Typography>
            
            {/* Album Cover Art */}
            <Box
              component="img"
              src={displayCover}
              alt={albumData.album_title}
              sx={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid #2a2a2a',
                mb: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
              }}
            />

            {/* Synopsis Box with text wrapping */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a', 
                borderRadius: '12px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#8a8a8a', 
                  lineHeight: '1.8', 
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word'
                }}
              >
                {albumData.synopsis || "No synopsis available for this album yet."}
              </Typography>
            </Paper>
          </Grid>

          {/* Album Reviews Section */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="overline" className="column-label">Album Reviews</Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                overflowX: 'auto', 
                gap: 2, 
                pb: 2,
                '&::-webkit-scrollbar': { height: '8px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#2a2a2a', borderRadius: '10px' }
              }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <Paper 
                  key={item} 
                  elevation={0} 
                  sx={{ 
                    minWidth: '300px', 
                    p: 2, 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px'
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#00e544', display: 'block', mb: 1 }}>
                    USER_REVIEW_{item}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8a8a8a' }}>
                    Review functionality coming soon.
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}