import { Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen'; 
import HomePage from './pages/Homepage';

function App() {
  return (
    <Routes>
      {/* Landing page to login screen */}
      <Route path="/" element={<LoginScreen />} />

      {/* Route for the homepage after login */}
      <Route path="/home" element={<HomePage />} /> 
    </Routes>
  );
}

export default App;

