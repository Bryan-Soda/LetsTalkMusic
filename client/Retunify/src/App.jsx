import { Routes, Route } from 'react-router-dom';
// import LoginScreen from './pages/LoginScreen'; 
// import Homepage from './pages/Homepage';
import Profilepage from './pages/Profilepage';
import TestLogin from './Test_Pages/MainTest.jsx'

function App() {
  return (
    <Routes>
      {/* Landing page to login screen */}
      {/* <Route path="/" element={<LoginScreen />} /> */}

      {/* Route for the homepage after login */}
      {/* <Route path="/home" element={<Homepage />} />  */}

      {/* Route for the profilepage after homepage */}
      <Route path='/' element={<TestLogin/>}></Route>
      <Route path="/profile-page" element={<Profilepage />} /> 

      
    </Routes>
  );
}

export default App;

