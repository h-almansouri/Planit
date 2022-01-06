import {useState, useEffect} from 'react'
import Wheel from './Wheel'
import FindCreateGroup from './FindCreateGroup'
// import CalendarTodayTwoTone from '@mui/icons-material'
import {Link} from 'react-router-dom'

function HomePage({setCurrentUser, currentUser, setGroupId}){

    const [allGroups, setAllGroups] = useState([])
    const [groupModal, setGroupModal] = useState(false)

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
                <Link to="/calendar" style={{ textDecoration: 'none', marginLeft: 20}}>
                    <CalendarIcon date={new Date()} style={{height: 10}}/>
                </Link>
                <button onClick={handleLogout} style={{float: 'right', marginRight: 10, height: '30px'}}>Logout</button>
            </div>
            <div className="home-prof">
                <img className="prof-pic" src={currentUser.profile_picture} alt="Profile"/>
                <h2>Welcome {currentUser.username}!</h2>
            </div>
            <button onClick={() => setGroupModal(true)}>Create/Find</button>
            <FindCreateGroup show={groupModal} setShow={setGroupModal}/>
            <div className="wheel-container">
             {systems}
            </div>
      </div>
    )
}

export default HomePage
