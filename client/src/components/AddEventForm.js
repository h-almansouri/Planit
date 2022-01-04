import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect} from 'react'
import TimePicker from 'react-bootstrap-time-picker';

function AddEventForm({showAdd, handleClose}){

    const [formData, setFormData] = useState({})
    const [adminGroups, setAdminGroups] = useState([])

    useEffect(() => {
        fetch('/my_admin_groups')
        .then(res => res.json())
        .then(data =>{
            setAdminGroups(data)
        })
      }, [])

      console.log(adminGroups)

    const handleFormChange = (e) => {
        console.log(e.target.id)
    }

    const groupOptions = adminGroups.map(group => <option value={group.name} key={group.id}>{group.name}</option>)

    return(
        <Modal show={showAdd} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Form.Group style={{padding: 10}} onChange={(e) => handleFormChange(e)}>
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>Date:</Form.Label>
                    <Form.Control id="start" type="date" name="start" placeholder="Start Date" />
                    <Form.Check
                    inline
                    type="switch"
                    id="allDay"
                    label="All Day"
                    />
                    <Form.Check
                    inline
                    type="switch"
                    id="multiDay"
                    label="Multiple Days"
                    />
                    <br/>
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>Start:</Form.Label>
                    <TimePicker start="00:00" end="23:30" step={30} style={{marginTop: -2}}/>
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>End:</Form.Label>
                    <TimePicker start="00:00" end="23:30" step={30} style={{marginTop: -2}}/>
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>End Date:</Form.Label>
                    <Form.Control id="end" type="date" name="end" placeholder="End Date" />
                    <Form.Check
                        inline
                        label="Personal"
                        name="type"
                        type="radio"
                        id='personalEvent'
                        defaultChecked
                    />
                    <Form.Check
                        inline
                        label="Group"
                        name="type"
                        type="radio"
                        id='groupEvent'
                    />
                    <Form.Select id="group" aria-label="Select Group" style={{marginTop: 5}}>
                        <option>Select Group</option>
                        {groupOptions}
                    </Form.Select>
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEventForm