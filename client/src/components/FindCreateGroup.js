import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FindCreateGroup({show, setShow}){

    const [searchGroup, setSearchGroup] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        group_picture: ''
    })

    let history = useNavigate()

    const handleClose = () =>{
        setShow(false)
        setSearchGroup('')
        setFormData({
            name: '',
            group_picture: ''
        })
    }

    const handleFormChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleGroupSearch = () => {
        fetch(`/search_groups/${searchGroup}`).then(res =>{
            if(res.ok){
                res.json().then(data =>{
                    localStorage.setItem('groupId', data.id)
                    setSearchGroup('')
                    setFormData({
                        name: '',
                        group_picture: ''
                    })
                    setShow(false)
                    history('/group')
                })
            }else{
                res.json().then(errors =>{
                    alert(errors.error)
                    setSearchGroup('')
                })
            }
        })
    }

    const handleGroupCreate = (e) => {
        e.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }

        fetch('/groups', configObj).then(res => {
            if(res.ok){
                res.json().then(data => {
                    localStorage.setItem('groupId', data.id)
                    setSearchGroup('')
                    setFormData({
                        name: '',
                        group_picture: ''
                    })
                    setShow(false)
                    history('/group')
                })
            }else{
                res.json().then(errors => {
                    console.log(errors)
                    alert(errors.errors)
                })
            }
        })
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Find/Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Label htmlFor="titleSearch" style={{marginTop: 5, marginLeft: 10}}>Search by Group:</Form.Label>
                    <Form.Control
                        type="text"
                        id="titleSearch"
                        aria-describedby="titleBlock"
                        value={searchGroup}
                        onChange={(e) => setSearchGroup(e.target.value)}
                        placeholder="Group Name"
                    />
                    <Button style={{marginTop: 10}} onClick={handleGroupSearch}>Search</Button>
                    <br/>
                    <br/>
                <Form onSubmit={handleGroupCreate}>
            <Form.Label htmlFor="titleCreate" style={{marginTop: 5, marginLeft: 10}}>Create a New Group:</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        aria-describedby="titleBlock"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Group Name"
                    />
            <Form.Label htmlFor="titleImage" style={{marginTop: 5, marginLeft: 10}}>Group Photo:</Form.Label>
                    <Form.Control
                        type="text"
                        id="group_picture"
                        aria-describedby="titleBlock"
                        value={formData.group_picture}
                        onChange={handleFormChange}
                        placeholder="Image URL"
                    />
            <Button variant="success" type="submit" style={{marginTop: 10}}>
                Create
            </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default FindCreateGroup