import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import ArtistAlbums from './pages/ArtistAlbums.jsx';
import TracksAndReviews from './pages/TracksAndReviews.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Dynamic route for artist's discography */}
      <Route path="/artists/:artistId" element={<ArtistAlbums />} />
      
      {/* Dynamic route for albums's tracks */}
      <Route path="/album/:artistId/:albumId" element={<TracksAndReviews />} />
    </Routes>
  );
}

export default App;