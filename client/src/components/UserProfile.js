import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react";

function UserProfile ({show, setShow, currentUser, setCurrentUser, setUserName, setProfPic}) {
    const [showDelete, setShowDelete] = useState(false)
    const [formData, setFormData] = useState({
        username: currentUser.username,
        bio: currentUser.bio,
        profile_picture: currentUser.profile_picture
    })
    const handleClose = () => {
        setShow(false)
        setFormData({
            username: currentUser.username,
            bio: currentUser.bio,
            profile_picture: currentUser.profile_picture
        })
    };
    function handleSubmit (e) {
        e.preventDefault()
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        fetch(`/users/${currentUser.id}`, configObj)
        .then(res => res.json())
        .then(data => {
            setFormData({
            username: data.username,
            bio: data.bio,
            profile_picture: data.profile_picture
             })
            setUserName(data.username)
            setProfPic(data.profile_picture)
            setShow(false)
        })
    }
    const handleDeleteClose = () => setShowDelete(false)
    const handleDeleteClick = () => {
        setShow(false)
        setShowDelete(true)
    }
    const handleDelete = () => {
        handleDeleteProfile(currentUser)
        setShowDelete(false)
    }
    const handleDeleteProfile = (profile) => {
        fetch(`/users/${profile.id}`, {method: 'DELETE'}).then(res => {
            if(res.ok) {
                setCurrentUser(null)
                fetch('/logout', { method: 'DELETE' })
            } else {
                res.json().then((errors) => {
                    alert(errors.errors);
                })
            }
        })
    }
    function handleFormChange(e) {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    return(
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {currentUser.username}'s Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group style={{padding: 10}} onChange={handleFormChange}>
                    <Form.Label style={{marginTop: 5, marginLeft: 10}}>Username</Form.Label>
                    <Form.Control type="text" id="username" value={formData.username} onChange={handleFormChange}/>
                    <Form.Label style={{marginTop: 5, marginLeft: 10}}>Bio</Form.Label>
                    <Form.Control type="text" id="bio" value={formData.bio} onChange={handleFormChange}/>
                    <Form.Label style={{marginTop: 5, marginLeft: 10}}>Profile Picture</Form.Label>
                    <Form.Control type="text" id="profile_picture" value={formData.profile_picture} onChange={handleFormChange}/>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDeleteClick}>
                        Delete Account
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancel
                        </Button>
                        <Button variant="success" type="submit">
                        Confirm
                        </Button>
                    </Modal.Footer>
                </Form.Group>
                </Form>
            </Modal>

            <Modal show={showDelete} onHide={handleDeleteClose}>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure you wish to delete ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button variant="secondary" onClick={handleDeleteClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} style={{float: 'right'}}>
                Delete
            </Button>
            </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserProfile