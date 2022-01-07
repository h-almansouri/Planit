import Modal from "react-bootstrap/Modal";
import { useState } from "react"

function Message ({message, groupID}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [userData, setUserData] = useState();
    function handleClick () {
        fetch(`/users/${message.user.id}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        setShow(true)
    }
    let serverList
    if(userData) {
        serverList = userData.all_groups.map(group => <li><img src={group.group_picture} className="group-prof-pic" alt={group.name}/>{group.name}</li>)
    }
    if(message.group.id == groupID || message.group_id == groupID) {
        console.log(message)
        return (
            <>
            <div className="user-text" onClick={handleClick}>
                <img className="group-prof-pic" src={message.user.profile_picture}/>
                <p className="text-text">{message.user.username}: {message.message}</p>
            </div>   
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <img src={message.user.profile_picture} className="group-prof-pic" alt={message.user.username}/>
                    <Modal.Title>{message.user.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>    
                    <h5>Birthday: {message.user.birthday}</h5>
                    <p>Bio: {message.user.bio}</p>
                    <h6>Servers {message.user.username} is in:</h6>
                    <ul> 
                        {serverList}
                    </ul>
                    
                </Modal.Body>
            </Modal>
        </>
        )
    } else return null
    
}

export default Message