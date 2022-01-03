import './App.css';
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import DisplayCalendar from './components/DisplayCalendar';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
      <Routes>
        <Route path='' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/calendar' element={<DisplayCalendar />}/>
      </Routes>
  );
}

export default App;
