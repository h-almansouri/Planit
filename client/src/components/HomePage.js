import {useState, useEffect} from 'react'
import UserProfile from './UserProfile';
import Wheel from './Wheel'
import FindCreateGroup from './FindCreateGroup'
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import {Link} from 'react-router-dom'
import useScrollBlock from './useScrollBlock'

function HomePage({setCurrentUser, currentUser, setGroupId}){

    const [allGroups, setAllGroups] = useState([])
    const [groupModal, setGroupModal] = useState(false)
    const [blockScroll, allowScroll] = useScrollBlock();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

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

    const systems = allGroups.map(collection => <Wheel blockScroll={blockScroll} allowScroll={allowScroll} key={collection[0].name} array={collection} setGroupId={setGroupId}/>)
    
    return(
        <div className="home-div">
            <div className="home-nav">
                <Link to="/calendar" style={{ textDecoration: 'none', marginLeft: 20}}>
                    <CalendarTodayTwoToneIcon color='error' fontSize='large'/>
                </Link>
                <button onClick={handleLogout} style={{float: 'right', marginRight: 10, height: '30px'}}>Logout</button>
            </div>
            <div className="home-prof">
                <img className="prof-pic" src={currentUser.profile_picture} onClick={handleShow}></img>
                <h2>Welcome {currentUser.username}!</h2>
            </div>
            <button onClick={() => setGroupModal(true)}>Create/Find</button>
            <FindCreateGroup show={groupModal} setShow={setGroupModal}/>
            <div className='scroll-bs'>
            <div className="wheel-container">
             {systems}
            </div>
            <UserProfile show={show} setShow={setShow} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>
        </div>
    )
}

export default HomePage
