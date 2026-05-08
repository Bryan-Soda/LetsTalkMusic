import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import './styles/TracksAndReviews.css';

export default function TracksAndReviews() {
  const { artistId, albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/artists/${artistId}/${albumId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setAlbumData(data[0]);
        else setAlbumData(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [artistId, albumId]);

  if (!albumData) return <div className="loading">Loading...</div>;

  return (
    <div className="tracks-reviews-page">
      {/* Top Bar matching ArtistAlbums exactly */}
      <div className="topbar">
        <Link to={`/artists/${artistId}`} className="back-link">← BACK</Link>
        <div className="greeting">
          {albumData.album_title ? albumData.album_title.toUpperCase() : "ALBUM"}
        </div>
        <div className="avatar">J</div>
      </div>

      <div className="main-content">
        {/* Optional Subtitle for Artist Name & Length */}
        <Typography variant="subtitle1" className="album-meta-subtitle">
          {albumData.artist_name} Total Album Length: {albumData.total_length}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Tracklist Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" className="column-label">Tracklist</Typography>
            <Paper elevation={0} className="scrollable-panel">
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

          {/* Reviews Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" className="column-label">Reviews</Typography>
            <Paper elevation={0} className="scrollable-panel review-placeholder">
              <Typography className="coming-soon-text">
                Review functionality coming soon.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}