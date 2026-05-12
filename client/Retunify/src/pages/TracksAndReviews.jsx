import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Typography, Paper, List, ListItem, Divider, TextField, Button, Rating, Stack } from '@mui/material';
import './styles/TracksAndReviews.css';

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
import CMIYGL from '../assets/AlbumCovers/CMIYGL.png';
import Malcolm from '../assets/AlbumCovers/Malcolm_todd.png';
import OKCPU from '../assets/AlbumCovers/OkComp.png';
import ChannelO from '../assets/AlbumCovers/ChannelO.png';
import TPAB from '../assets/AlbumCovers/TPAB.png';
import abysskiss from '../assets/AlbumCovers/abysskiss.jpg';
import BehindTheMask from '../assets/AlbumCovers/BehindTheMask.jpg';
import Charm from '../assets/AlbumCovers/Charm.jpg';
import Deadbeat from '../assets/AlbumCovers/Deadbeat.jpg';
import Discovery from '../assets/AlbumCovers/Discovery.jpg';
import IICHL from '../assets/AlbumCovers/IfICantHaveLove.jpeg';
import PH from '../assets/AlbumCovers/PureHeroine.jpg';
import SOS from '../assets/AlbumCovers/SOS.jpg';
import TangoInTheNight from '../assets/AlbumCovers/TangoInTheNight.jpg';
import NoLoveLost from '../assets/AlbumCovers/NoLoveLost.jpg';

// Keys must be EXACT name as in seed_data!!
const albumCoverMap = {
  "abysskiss": abysskiss,
  "Behind The Mask": BehindTheMask,
  "Charm": Charm,
  "Deadbeat": Deadbeat,
  "Discovery": Discovery,
  "If I Can't Have Love, I Want Power": IICHL,
  "Pure Heroine": PH,
  "SOS": SOS,
  "Tango in the Night": TangoInTheNight,
  "Behind the Mask": BehindTheMask,
  "No Love Lost to Kindness": NoLoveLost,
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
  "Superclean Vol. I": SuperCleanVol1,
  "Sweet Boy": SweetBoy,
  "The Great Impersonator": TheGreatImpersonator,
  "Thriller": Thriller,
  "to hell with it": ToHellWithIt,
  "Two Hands": TwoHands,
  "CALL ME IF YOU GET LOST": CMIYGL,
  "Malcolm Todd": Malcolm,
  "OK Computer": OKCPU,
  "channel ORANGE": ChannelO,
  "To Pimp A Butterfly": TPAB,
};

export default function TracksAndReviews() {

  const API = import.meta.env.VITE_API_URL;

  const { artistId, albumId } = useParams();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const [albumData, setAlbumData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [ratingAvg, setRatingAvg] = useState(0);

  useEffect(() => {
    fetch(`${API}/artists/${artistId}/${albumId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setAlbumData(data[0]);
        else setAlbumData(data);
      })
      .catch(err => console.error("Fetch error:", err));

      fetch(`${API}/reviews/album/${albumId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(err => console.error("Fetch error for reviews:", err));

  }, [artistId, albumId]);

  const avgRating = useMemo(() =>{
    if(!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, rev)=> sum + rev.rating, 0);
    const avg = total/ reviews.length;
    return parseFloat(avg.toFixed(1)); 
  }, [reviews]) 

  const handleSubmitReview = async () => {
    if (!userId) return alert("You must be logged in to post a review!");
    if (newRating === 0) return alert("Please leave a rating!");

    try {
      const response = await fetch(`${API}/reviews/${userId}/${albumId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newRating,
          review: newReviewText
        })
      });
      if (response.ok) {
        // Optimistically add the new review to the screen
        const createdRev = await response.json()
        console.log(createdRev);
        setReviews(prev => [...prev, createdRev]);
        // Clear the state
        setNewReviewText(''); 
        setNewRating(0);
        
        // NEW: Wipe the saved drafts from local storage so the box empties out
        localStorage.removeItem(`draft_review_${albumId}`);
        localStorage.removeItem(`draft_rating_${albumId}`);
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.error || "Failed to post review"}`);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

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
          <Grid item xs={12} md={4}>
            <Typography variant="overline" className="column-label" sx={{mb:1}}>Tracklist</Typography>
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
            md={3} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center'
              
            }}
          >
            <Typography variant="overline" className="column-label" sx={{ alignSelf: 'flex-start' }}>
              Album Details
            </Typography>

            <Box sx={{display:'flex', flexDirection:'row', gap:2, width:'100%'}}>
              <Box
                component="img"
                src={displayCover}
                alt={albumData.album_title}
                sx={{
                  height: '500',
                  width: '100%',
                  maxWidth: '450px',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #2a2a2a',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.7)'
                }}
              />


            </Box>
          </Grid>
          <Grid item md={2} sx={{display:{xs:'none', md:'block'}}} />
          {/* 3. Container used to store Ratings component */}
          <Grid item xs={12} md={3} sx={{display:'flex', flexDirection:'column'}}>
            <Typography variant='overline' className='column-label'>
              Album Average Rating:
            </Typography>
            <Paper 
              elevation = {0}
              sx={{
                // flex:1,
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a', 
                borderRadius: '12px',
                minWidth: '200px',
                height: '200px',
                p:2,
                alignItems: 'center',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
              }}
            >

              <Typography variant='h3' sx={{mb:2,color: '#00e544', fontWeight:'bold'}}>
                {avgRating > 0 ? avgRating:'--'}
              </Typography>
              <Rating
                value={avgRating}
                readOnly
                size='large'
                precision={0.1}
                sx={{mt:1}}
              />
              <Typography variant='caption' sx={{color:'#8a8a8a', mt:1}}>
                {reviews.length} {reviews.length === 1 ? 'review':'reviews'}
              </Typography>
            </Paper>
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
            {/* Write a Review Box */}
            {userId && !reviews.some(rev => rev.user === username) ? (
              <Paper elevation={0} 
              sx={{ 
                minWidth: '320px', 
                maxWidth: '320px', 
                p: 2, 
                backgroundColor: '#454545',
                border: '1px solid #1ED760',
                borderRadius: '8px',
                flexShrink: '0'
              }}>
                <Typography variant="caption" sx={{ color: '#1ED760', display: 'block', mb: 1, fontWeight: 'bold' }}>
                    WRITE A REVIEW
                </Typography>
                <Rating value={newRating} onChange={(e, val) => setNewRating(val)} precision={0.5} size="medium" sx={{ mb: 1 }}/>
                  <TextField
                    multiline fullWidth minRows={2} placeholder="What did you think?" value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} size="medium" 
                    inputProps={{ style: {color: 'white', fontSize: '14px' } }}
                    sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'grey', '& fieldset': { borderColor: '#333' }, '&.Mui-focused fieldset': { borderColor: '#1ED760' } }, mb: 1 }}
                  />
                  <Button fullWidth variant="contained" size="medium" onClick={handleSubmitReview} sx={{ backgroundColor: '#1ED760', color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#18b951' } }}>
                    Post Review
                  </Button>

                  {/* Render Fetched Reviews */}
                  {/* {reviews.length === 0 ? (
                    <Typography sx={{ color: '#8a8a8a', p: 2 }} >
                      No Reviews Yet. Be The First!
                    </Typography>
                  ) : (
                    reviews.map((rev, index) => (
                      <Paper key={index} elevation={0} sx={{ minWidth: '280px', maxWidth: '300px', p: 2, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', flexShrink: 0, display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                          <Typography variant="caption" sx={{ color: '#00e544', fontWeight: 'bold' }}>
                            @{rev.user}
                          </Typography>
                          <Rating value={rev.rating} readOnly size="medium" precision={0.5}/>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8a8a8a' }}>
                          {rev.review || "No text provided"}
                        </Typography>
                      </Paper>
                    ))
                  )} */}
              </Paper>
            ): userId ? (
              <Paper
                elevation={0}
                sx={{
                  minWidth: '320px',
                  maxWidth: '320px',
                  p: 2,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'white', textAlign: 'center' }}
                >
                  You have already reviewed this album! Head to your profile to edit it.
                </Typography>
              </Paper>
              ): null}
              {/* Render Fetched Reviews */}
                  {reviews.length === 0 ? (
                    <Typography sx={{ color: '#8a8a8a', p: 2 }} >
                      No Reviews Yet. Be The First!
                    </Typography>
                  ) : (
                    reviews.map((rev, index) => (
                      <Paper key={index} elevation={0} sx={{ minWidth: '280px', maxWidth: '300px', p: 2, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', flexShrink: 0, display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                          <Typography variant="caption" sx={{ color: '#00e544', fontWeight: 'bold' }}>
                            @{rev.user}
                          </Typography>
                          <Rating value={rev.rating} readOnly size="medium" precision={0.5}/>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8a8a8a' }}>
                          {rev.review || "No text provided"}
                        </Typography>
                      </Paper>
                    ))
                  )}
              {/* {[1, 2, 3, 4, 5].map((item) => (
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
              ))} */}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}