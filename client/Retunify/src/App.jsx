import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import ArtistAlbums from './pages/ArtistAlbums.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Dynamic route for artist's discography */}
      <Route path="/artists/:artistId" element={<ArtistAlbums />} />
    </Routes>
  );
}

export default App;