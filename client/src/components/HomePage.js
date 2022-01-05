import {useState, useEffect} from 'react'
import Wheel from './Wheel'

function HomePage({setCurrentUser, currentUser, setGroupId}){

    const [allGroups, setAllGroups] = useState([])

    useEffect(() => {
        fetch('/my_total_groups')
        .then(res => res.json())
        .then(data =>{
            setAllGroups(data.all_groups)
        })
      }, [])

    const handleLogout = () => {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
    }

    const systems = allGroups.map(collection => <Wheel key={collection[0].name} array={collection} setGroupId={setGroupId}/>)
    
    return(
        <div className="home-div">
            <div className="home-nav">
                <a href='/calendar'>Calender</a>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="home-prof">
                <image className="prof-pic" src={currentUser.profile_picture}></image>
                <h2>Welcome {currentUser.username}!</h2>
            </div>
            <div className="wheel-container">
             {systems}
            </div>
      </div>
    )
}

export default HomePage
