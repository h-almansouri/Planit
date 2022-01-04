import {useState, useEffect} from 'react'
import Wheel from './Wheel'

function HomePage({setCurrentUser}){

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

    return(
        <div className="home-div">
            <div className="home-nav">
                <span>Calender</span>
                <button>Logout</button>
            </div>
            <div className="home-prof">
                <span className="prof-pic">Prof Pic</span>
                <h2>Welcome Username!</h2>
            </div>
            <div>
              {/* homepage
              <button onClick={handleLogout}>logout</button> */}
              <Wheel array={allGroups} />
            </div>
      </div>
    )
}

export default HomePage