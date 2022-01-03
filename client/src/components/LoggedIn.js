import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import DisplayCalendar from './DisplayCalendar'


function LoggedIn({ setCurrentUser}){


    return(
        <Routes>
            <Route path='/' element={<HomePage setCurrentUser={setCurrentUser}/>} />
            <Route path='/calendar' element={<DisplayCalendar />}/>
        </Routes>
    )
}

export default LoggedIn