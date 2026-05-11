import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import ArtistAlbums from './pages/ArtistAlbums.jsx';
import TracksAndReviews from './pages/TracksAndReviews.jsx';
import LoginScreen from './pages/LoginScreen'; 
import CreateAccount from './pages/CreateAccount';
import ProfilePage from './pages/Profilepage.jsx';

const App = () => {
  return (
    <Routes>
      {/* Landing page defaults to login */}
      <Route path="/" element={<LoginScreen />} />

      {/* Page for account creation */}
      <Route path="/create-account" element={<CreateAccount />} />

      {/* Main landing page after login */}
      <Route path="/home" element={<Homepage />} />

      {/* Main landing page after login */}
      <Route path="/profile/" element={<ProfilePage />} />

      {/* Dynamic route for artist's discography */}
      <Route path="/artists/:artistId" element={<ArtistAlbums />} />
      
      {/* Dynamic route for albums's tracks */}
      <Route path="/album/:artistId/:albumId" element={<TracksAndReviews />} />
    </Routes>
  );
};

export default App;