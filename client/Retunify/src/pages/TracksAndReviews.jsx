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

  const api = "http://127.0.0.1:5000";

  const { artistId, albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    fetch(`${api}/artists/${artistId}/${albumId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setAlbumData(data[0]);
        else setAlbumData(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [artistId, albumId]);

  if (!albumData) return <div className="loading">Loading...</div>;

  const displayCover = albumCoverMap[albumData.album_title] || "https://via.placeholder.com/400";

  return (
    <div className="tracks-reviews-page">
      <div className="topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={`/artists/${artistId}`} className="back-link" style={{ width: '80px', textDecoration: 'none', color: '#00e544' }}>
          ← BACK
        </Link>
        
        <div className="greeting" style={{ flex: 1, textAlign: 'center' }}>
          {albumData.album_title ? albumData.album_title.toUpperCase() : "ALBUM"}
        </div>

        {/* Empty div to balance the flex space for the back-link */}
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="main-content">
        <Typography variant="subtitle1" className="album-meta-subtitle" sx={{ textAlign: 'center' }}>
          {albumData.artist_name} | Total Length: {albumData.total_length} |
        </Typography>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          
          {/* 1. LEFT CONTAINER: Tracklist */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" className="column-label">Tracklist</Typography>
            <Paper 
              elevation={0} 
              className="scrollable-panel" 
              sx={{ 
                maxHeight: '450px',
                overflowY: 'auto',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px'
              }}
            >
              <List disablePadding>
                {albumData.tracks?.map((track, index) => (
                  <React.Fragment key={track.track_id}>
                    <ListItem sx={{ py: 2 }}>
                      <div className="track-row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
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

          {/* 2. RIGHT CONTAINER: Album Cover */}
          <Grid 
            item 
            xs={12} 
            md={6} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center'
            }}
          >
            <Typography variant="overline" className="column-label" sx={{ alignSelf: 'flex-start' }}>
              Album Details
            </Typography>
            <Box
              component="img"
              src={displayCover}
              alt={albumData.album_title}
              sx={{
                width: '100%',
                maxWidth: '450px',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid #2a2a2a',
                boxShadow: '0 12px 40px rgba(0,0,0,0.7)'
              }}
            />
          </Grid>

          {/* 3. BOTTOM CONTAINER 1: Album Synopsis */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="overline" className="column-label">Album Synopsis</Typography>
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
                  textAlign: 'left'
                }}
              >
                {albumData.synopsis || "No synopsis available."}
              </Typography>
            </Paper>
          </Grid>

          {/* 4. BOTTOM CONTAINER 2: Reviews */}
<Grid item xs={12} sx={{ mt: 2, width: '100%' }}>
  <Typography variant="overline" className="column-label">Album Reviews</Typography>
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      overflowX: 'auto', // Ensures horizontal scrolling
      gap: 2, 
      pb: 2,
      width: '100%',
      '&::-webkit-scrollbar': { height: '8px' }, // Optional: style the scrollbar
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#2a2a2a', borderRadius: '4px' }
    }}
  >
    {[1, 2, 3, 4, 5].map((item) => (
      <Paper 
        key={item} 
        elevation={0} 
        sx={{ 
          minWidth: '280px', // Fixed width to force the overflow
          maxWidth: '300px',
          p: 2, 
          backgroundColor: '#1a1a1a', 
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          flexShrink: 0 // Prevents the cards from squishing
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