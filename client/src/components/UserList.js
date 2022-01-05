import Modal from "react-bootstrap/Modal";
import { useState } from "react"

function UserList ({user}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [userData, setUserData] = useState(null);
    function handleClick () {
        fetch(`/users/${user.id}`)
        .then(res => res.json())
        .then(data => {setUserData(data)
        console.log(data)})
        setShow(true)
    }
    let serverList
    if(userData) {
        serverList = userData.all_groups.map(group => <li><img src={group.group_picture} className="group-prof-pic"></img>{group.name}</li>)
    }
    return (
        <div>
            <div className="group-prof" onClick={handleClick}>
                <img src={user.profile_picture} className="group-prof-pic"/>
                <div title={user.username}>{user.username}</div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <img src={user.profile_picture} className="group-prof-pic"/>
                    <Modal.Title>{user.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>    
                    <h5>Birthday: {user.birthday}</h5>
                    <p>Bio: {user.bio}</p>
                    <h6>Servers {user.username} is in:</h6>
                    <ul> 
                        {/* <li>test</li> */}
                        {serverList}
                    </ul>
                    
                </Modal.Body>
            </Modal>
        </div>
        
    )
}

export default UserList