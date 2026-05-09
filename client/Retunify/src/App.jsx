import { Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen'; 
import HomePage from './pages/Homepage';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <Routes>
      {/* Landing page to login screen */}
      <Route path="/" element={<LoginScreen />} />

      {/* New Route for account creation */}
      <Route path="/create-account" element={<CreateAccount />} />

      {/* Route for the homepage after login */}
      <Route path="/home" element={<HomePage />} /> 
    </Routes>
  );
}

export default App;