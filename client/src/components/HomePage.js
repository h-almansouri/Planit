import {useState, useEffect} from 'react'
import GroupCircle from './GroupCircle'

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

    const systems = allGroups.map(collection => <GroupCircle key={collection[0]} array={collection}/>)

    return(
        <div className="home-div">
            <div className="home-nav">
                <a href='/calendar'>Calender</a>
                <button>Logout</button>
            </div>
            <div className="home-prof">
                <span className="prof-pic">Prof Pic</span>
                <h2>Welcome {currentUser.username}!</h2>
            </div>
            <div className="home-servers-list">
                <span className="home-server" >Serv1</span>
                <span className="home-server">Serv2</span>
                <span className="home-server">Serv3</span>
                <span className="home-server">Serv4</span>
                <span className="home-server">+</span>
            </div>
            <div>
              homepage
              <button onClick={handleLogout}>logout</button>
              {systems}
            </div>
      </div>
    )
}

export default HomePage