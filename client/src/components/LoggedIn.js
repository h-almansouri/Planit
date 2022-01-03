import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import DisplayCalendar from './DisplayCalendar'


function LoggedIn({ setCurrentUser, currentUser }){


    return(
        <Routes>
            <Route path='/' element={<HomePage setCurrentUser={setCurrentUser}/>} />
            <Route path='/calendar' element={<DisplayCalendar currentUser={currentUser}/>}/>
        </Routes>
    )
}

export default LoggedIn