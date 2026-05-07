import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import ArtistAlbums from './pages/ArtistAlbums.jsx';
import AlbumTracks from './pages/AlbumTracks.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Dynamic route for artist's discography */}
      <Route path="/artist/:artistId" element={<ArtistAlbums />} />
      
      {/* Dynamic route for specific album tracks/reviews */}
      <Route path="/album/:artistId/:albumId" element={<AlbumTracks />} />
    </Routes>
  );
}

export default App;