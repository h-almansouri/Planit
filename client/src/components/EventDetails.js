import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect} from 'react'
import TimePicker from 'react-bootstrap-time-picker';

function EventDetails({show, setShow, event, handleEditSubmit, currentUser}){

    const [showEdit, setShowEdit] = useState(false)
    const [formData, setFormData] = useState({
      user_id: currentUser.id,
      group_id: null,
      title: '',
      start: '',
      end: '',
      desc: '',
      all_day: false,
      color: 'blue'
  })
  const [multiDay, setMultiDay] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isGroup, setIsGroup] = useState(false)

    const handleEditClose = () => {
      setShowEdit(false);
      setMultiDay(false);
      setIsGroup(false)
      setStartTime(0)
      setEndTime(0)
      setFormData({
          user_id: currentUser.id,
          group_id: null,
          title: '',
          start: '',
          end: '',
          desc: '',
          all_day: false,
          color: 'blue'
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      handleEditSubmit(formData)
  
      setShowEdit(false);
      setMultiDay(false);
      setIsGroup(false)
      setStartTime(0)
      setEndTime(0)
      setFormData({
          user_id: currentUser.id,
          group_id: null,
          title: '',
          start: '',
          end: '',
          desc: '',
          all_day: false,
          color: 'blue'
      })
    }


  const handleFormChange = (e) => {

      if(e.target.id === "allDay"){
          setFormData({
              ...formData,
              all_day: !formData.all_day
          })
      }else if(e.target.id === "multiDay"){
          setMultiDay(!multiDay)
          setStartTime(0)
          setEndTime(0)
      }else if(e.target.id === "start"){
          const startDay = new Date(e.target.value)
          startDay.setHours(0)
          const endDay = new Date(e.target.value)
          endDay.setHours(0)
          startDay.setDate(startDay.getDate() + 1)
          endDay.setDate(endDay.getDate() + 1)
          setFormData({
              ...formData,
              start: startDay,
              end: endDay
          })
      }else if(e.target.id === "end"){
          const endDay = new Date(e.target.value)
          endDay.setDate(endDay.getDate() + 1)
          setFormData({
              ...formData,
              end: endDay
          })
      }else if(e.target.id === "start_time"){
          const inputTime = parseInt(e.target.value, 10)
          const currentDay = formData.start
          const endDay = formData.end
          const timeInHours = (inputTime / 60 / 60)
          if(timeInHours % 1 === 0.5){
              currentDay.setHours(timeInHours, 30)
              setFormData({
                  ...formData,
                  start: currentDay
              })
              if(inputTime > endTime){
                  endDay.setHours(timeInHours, 30)
                  setFormData({
                      ...formData,
                      end: endDay
                  })
              }
          }else{
              currentDay.setHours(timeInHours, 0)
              setFormData({
                  ...formData,
                  start: currentDay
              })
              if(inputTime > endTime){
                  endDay.setHours(timeInHours, 0)
                  setFormData({
                      ...formData,
                      end: endDay
                  })
              }
          }
      }else if(e.target.id === "end_time"){
          let inputTime = parseInt(e.target.value, 10)
          if (inputTime < startTime){
              inputTime = startTime
          }
          const startRef = formData.start.getTime()
          const currentDay = new Date(startRef)
          const timeInHours = (inputTime / 60 / 60)
          if(timeInHours % 1 === 0.5){
              currentDay.setHours(timeInHours, 30)
              setFormData({
                  ...formData,
                  end: currentDay
              })
          }else{
              currentDay.setHours(timeInHours, 0)
              setFormData({
                  ...formData,
                  end: currentDay
              })
      }
      }else if(e.target.id === 'personalEvent'){
          setIsGroup(!isGroup)
          setFormData({
              ...formData,
              group_id: null
          })
      }else if(e.target.id === 'groupEvent'){
          setIsGroup(!isGroup)
      }else if(e.target.id === 'group'){
          setFormData({
              ...formData,
              group_id: parseInt(e.target.value, 10)
          })
      }else{
          setFormData({
              ...formData,
              [e.target.id]: e.target.value
          })
      }
  }

  const handleStartTime = (e) => {
    setStartTime(e)
    if (e > endTime){
        setEndTime(e)
    }
}

const handleEndTime = (e) => {
    if (e > startTime){
        setEndTime(e)
    }else{
        setEndTime(startTime)
    }
}

  let eventLength

    if(formData.all_day){
        eventLength = null
    }else if(multiDay){
        eventLength = <>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>End Date:</Form.Label>
        <Form.Control id="end" type="date" name="end" placeholder="End Date" />
        </>
    }else if(formData.start !== ''){
        eventLength = 
        <>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>Start:</Form.Label>
        <TimePicker id="start_time" start="00:00" end="23:30" step={30} style={{ marginTop: -2 }} onChange={(e) => handleStartTime(e)} value={startTime}/>
        <Form.Label style={{ marginLeft: 10, marginTop: 5 }}>End:</Form.Label>
        <TimePicker id='end_time' start="00:00" end="23:30" step={30} style={{ marginTop: -2 }} onChange={(e) => handleEndTime(e)} 
        value={endTime}/>
        </>
    }

    console.log(event);

    const handleClose = () => setShowEdit(false)

    const handleEditClick = () => {
        setShow(false)
        setShowEdit(true)
    }
 
    return(
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>{event.desc}</h6>
            <h6>Start: {event.start.toUTCString().slice(0, -7)}</h6>
            <h6>End: {event.end.toUTCString().slice(0, -7)}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
        </Modal>


        <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
                <Modal.Title>Edit {event.title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleFormChange}>
                    <Form.Label htmlFor="title" style={{marginTop: 5, marginLeft: 10}}>Event Title:</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        aria-describedby="titleBlock"
                        value={formData.title}
                        onChange={handleFormChange}
                    />
                    <Form.Label htmlFor="desc" style={{marginTop: 5, marginLeft: 10}}>Description:</Form.Label>
                    <Form.Text id="optionalDesc" muted style={{marginLeft: 5}}>
                        (optional)
                    </Form.Text>
                    <Form.Control
                        type="text"
                        id="desc"
                        aria-describedby="descriptionBlock"
                        value={formData.desc}
                        onChange={handleFormChange}
                    />
                    <Form.Label style={{marginLeft: 10, marginTop: 5}}>{multiDay ? "Stary Date:" : "Date:"}</Form.Label>
                    <Form.Control id="start" type="date" name="start" placeholder="Start Date"/>
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
                    {formData.all_day ?
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
            <Modal.Footer>
                <Button variant="secondary" onClick={handleEditClose}>
                Cancel
                </Button>
                <Button variant="success" type="submit">
                Confirm
                </Button>
            </Modal.Footer>
            </Form.Group>
            </Form>
        </Modal>
        </>
    )
}

export default EventDetails