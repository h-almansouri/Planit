import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import DisplayCalendar from './DisplayCalendar'
import { useState } from "react";
import GroupPage from "./GroupPage";


function LoggedIn({ setCurrentUser, currentUser }){
    const [groupId, setGroupId] = useState()

    return(
        <Routes>
            <Route path='/' element={<HomePage setCurrentUser={setCurrentUser} currentUser={currentUser} setGroupId={setGroupId}/>} />
            <Route path='/calendar' element={<DisplayCalendar currentUser={currentUser}/>}/>
            <Route path='/group' element={<GroupPage groupId={groupId} currentUser={currentUser}/>}/>
        </Routes>
    )
}

export default LoggedIn