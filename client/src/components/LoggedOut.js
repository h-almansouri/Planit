import { Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage'
import Login from './Login'
import Signup from './Signup'


function LoggedOut({setCurrentUser}){


    return(
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}/>
            <Route path='/signup' element={<Signup setCurrentUser={setCurrentUser}/>}/>
        </Routes>
    )
}

export default LoggedOut