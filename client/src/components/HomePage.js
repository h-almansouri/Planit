import {useState, useEffect} from 'react'
import Wheel from './Wheel'

function HomePage({setCurrentUser, currentUser}){

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

    const systems = allGroups.map(collection => <Wheel key={collection[0]} array={collection}/>)

    return(
        <div className="home-div">
            <div className="home-nav">
                <a href='/calendar'>Calender</a>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="home-prof">
                <span className="prof-pic">Prof Pic</span>
                <h2>Welcome {currentUser.username}!</h2>
            </div>
            <div className="wheel-container">
             {systems}
            </div>
      </div>
    )
}

export default HomePage
