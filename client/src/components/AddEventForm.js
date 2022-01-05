import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect} from 'react'
import TimePicker from 'react-bootstrap-time-picker';

function AddEventForm({showAdd, setShowAdd}){

    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',
        allDay: false,
        color: 'blue'
    })
    const [adminGroups, setAdminGroups] = useState([])
    // const [allDay, setAllDay] = useState(false)
    const [multiDay, setMultiDay] = useState(false)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isGroup, setIsGroup] = useState(false)

    useEffect(() => {
        fetch('/my_admin_groups')
        .then(res => res.json())
        .then(data =>{
            setAdminGroups(data)
        })
      }, [])

      const handleClose = () => {
        setShowAdd(false);
        // setAllDay(false);
        setMultiDay(false);
        setIsGroup(false)
      }

    //   console.log(adminGroups)

    const handleFormChange = (e) => {
        console.log(e.target.id)

        if(e.target.id === "allDay"){
            setFormData({
                ...formData,
                allDay: !formData.allDay
            })
        }else if(e.target.id === "multiDay"){
            setMultiDay(!multiDay)
        }else{
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    console.log(formData)

    const groupOptions = adminGroups.map(group => <option value={group.name} key={group.id}>{group.name}</option>)

    // const handleAllDay = (e) => {
    //     setAllDay(!allDay)
    //     setFormData({
    //         ...formData,
    //         allDay: !allDay
    //     })
    //     console.log(e.target.value)
    // }

    // const handleMultiDay = () => {
    //     setMultiDay(!multiDay)
    // }

    const handleStartTime = (e) => {
        console.log(e)
        setStartTime(e)
        if (e > endTime){
            setEndTime(e)
        }
    }

    const handleEndTime = (e) => {
        console.log(e)
        if (e > startTime){
            setEndTime(e)
        }else{
            setEndTime(startTime)
        }
    }

    const handleRadio = (e) => {
        setIsGroup(!isGroup)
    }

    let eventLength

    if(formData.allDay){
        eventLength = null
    }else if(multiDay){
        eventLength = <>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>End Date:</Form.Label>
        <Form.Control id="end" type="date" name="end" placeholder="End Date" />
        </>
    }else{
        eventLength = 
        <>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>Start:</Form.Label>
        <TimePicker id="start_time" start="00:00" end="23:30" step={30} style={{ marginTop: -2 }} onChange={(e) => handleStartTime(e)} value={startTime}/>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>End:</Form.Label>
        <TimePicker id='end_time' start="00:00" end="23:30" step={30} style={{ marginTop: -2 }} onChange={(e) => handleEndTime(e)} 
        value={endTime}/>
        </>
    }

    return(
        <Modal show={showAdd} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
            </Form.Text>
            <Form.Group style={{padding: 10}} onChange={(e) => handleFormChange(e)}>
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>{multiDay ? "Stary Date:" : "Date:"}</Form.Label>
                    <Form.Control id="start" type="date" name="start" placeholder="Start Date" />
                    {multiDay ?
                    <Form.Check
                    inline
                    type="switch"
                    id="allDayDis"
                    label="All Day"
                    disabled
                    />
                    :
                    <Form.Check
                    inline
                    type="switch"
                    id="allDay"
                    label="All Day"
                    // onChange={(e) => handleAllDay(e)}
                    // value={formData.allDay}
                    />}
                    {formData.allDay ?
                    <Form.Check
                    inline
                    type="switch"
                    id="multiDayDis"
                    label="Multiple Days"
                    disabled
                    />
                    :
                    <Form.Check
                    inline
                    type="switch"
                    id="multiDay"
                    label="Multiple Days"
                    // onChange={(e) => handleMultiDay(e)}
                    />}
                    <br/>
                    {eventLength}
                    <Form.Check
                        inline
                        label="Personal"
                        name="type"
                        type="radio"
                        id='personalEvent'
                        onChange={handleRadio}
                        defaultChecked
                    />
                    <Form.Check
                        inline
                        label="Group"
                        name="type"
                        type="radio"
                        id='groupEvent'
                        onChange={handleRadio}
                    />
                    {isGroup ? <Form.Select id="group" aria-label="Select Group" style={{marginTop: 5}}>
                        <option>Select Group</option>
                        {groupOptions}
                    </Form.Select> : null}
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