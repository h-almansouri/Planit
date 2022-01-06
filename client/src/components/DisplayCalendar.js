import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useState, useEffect} from 'react'
import 'react-big-calendar/lib/sass/styles.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Fab from '@mui/material/Fab';
import AddEventForm from './AddEventForm';
import EventDetails from './EventDetails'

const localizer = momentLocalizer(moment)

function DisplayCalendar({currentUser}){

    const [selected, setSelected] = useState(null);
    const [allEvents, setAllEvents] = useState([]);
    const [personalEvents, setPersonalEvents] = useState([]);
    const [groupEvents, setGroupEvents] = useState([]);
    const [filterToggle, setFilterToggle] = useState("All")
    const [selectedEvents, setSelectedEvents] = useState([])
    const [showAdd, setShowAdd] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [adminGroups, setAdminGroups] = useState([])


    useEffect(() => {
        fetch('/all_events')
        .then(res => res.json())
        .then(data =>{
            const group = data.all_events.group
            const personal = data.all_events.personal
            const all = [...group, ...personal]
            setGroupEvents(group)
            setPersonalEvents(personal)
            setAllEvents(all)
            setSelectedEvents(all)
            setAdminGroups(data.all_events.admins)
        })
      }, [])

      
    const handleFilterToggle = (e) => {
        setFilterToggle(e.target.value)
        if(e.target.value === "All"){
            setSelectedEvents(allEvents)
        }else if(e.target.value === "Group"){
            setSelectedEvents(groupEvents)
        }else if(e.target.value === "Personal"){
            setSelectedEvents(personalEvents)
        }
    }

    const handleSelected = (event) => {
        setSelected(event);
        setShowDetails(true)
    }

    const handleShowAdd = () => setShowAdd(true);
    
    const showEvents = selectedEvents.map(e => {
        return({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end)
        })
    })

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.color
        };
        return {
            style: style
        };
    }

    const handleNewEventSubmit= (formData) => {
  
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }


        if(formData.group_id){
            fetch('/group_events', configObj).then((resp) =>{ 
                if (resp.ok) {
                    resp.json().then((data) => {
                    setGroupEvents([...groupEvents, data])
                    setAllEvents([...allEvents, data])
                    if(filterToggle === 'All' || filterToggle === 'Group'){
                        setSelectedEvents([...selectedEvents, data])
                    }
                    })
                } else {
                    resp.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }else{
            fetch('/personal_events', configObj).then((resp) =>{ 
                if (resp.ok) {
                    resp.json().then((data) => {
                    setPersonalEvents([...personalEvents, data])
                    setAllEvents([...allEvents, data])
                    if(filterToggle === 'All' || filterToggle === 'Personal'){
                        setSelectedEvents([...selectedEvents, data])
                    }
                    })
                } else {
                    resp.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }
    }

    const handleEditSubmit = (event, data) => {
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        if(data.group_id){
            fetch(`/group_events/${event.id}`, configObj).then(res => {
                if(res.ok){
                    res.json().then((data) => {
                        const newGroupEvents = groupEvents.map(event => event.id === data.id ? data : event);
                        const newAllEvents = allEvents.map(event => event.group_id && event.id === data.id ? data : event);
                        setGroupEvents(newGroupEvents)
                        setAllEvents(newAllEvents)
                        if(filterToggle === 'All'){
                            setSelectedEvents(newAllEvents);
                        }else if(filterToggle === 'Group'){
                            setSelectedEvents(newGroupEvents);
                        }
                    })
                }else{
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }else{
            fetch(`/personal_events/${event.id}`, configObj).then(res => {
                if(res.ok){
                    res.json().then((data) => {
                        const newPersonalEvents = personalEvents.map(event => event.id === data.id ? data : event);
                        const newAllEvents = allEvents.map(event => !event.group_id && event.id === data.id ? data : event);
                        setPersonalEvents(newPersonalEvents)
                        setAllEvents(newAllEvents)
                        if(filterToggle === 'All'){
                            setSelectedEvents(newAllEvents);
                        }else if(filterToggle === 'Personal'){
                            setSelectedEvents(newPersonalEvents);
                        }
                    })
                }else{
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }
    }


    const handleDeleteEvent = (event) => {
        if(event.group_id){
            fetch(`/group_events/${event.id}`, { method: 'DELETE' }).then(res => {
                if (res.ok) {
                    const deletedAllArray = allEvents.filter(e => !e.group_id || e.id !== event.id)
                    const deletedGroupArray = groupEvents.filter(e => e.id !== event.id)
                    setGroupEvents(deletedGroupArray)
                    setAllEvents(deletedAllArray)
                    if(filterToggle === 'All'){
                        setSelectedEvents(deletedAllArray)
                    }else if(filterToggle === 'Group'){
                        setSelectedEvents(deletedGroupArray)
                    }
                } else {
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }else{
            fetch(`/personal_events/${event.id}`, { method: 'DELETE' }).then(res => {
                if (res.ok) {
                    const deletedAllArray = allEvents.filter(e => e.group_id || e.id !== event.id)
                    const deletedPersonalArray = personalEvents.filter(e => e.id !== event.id)
                    setPersonalEvents(deletedPersonalArray)
                    setAllEvents(deletedAllArray)
                    if(filterToggle === 'All'){
                        setSelectedEvents(deletedAllArray)
                    }else if(filterToggle === 'Personal'){
                        setSelectedEvents(deletedPersonalArray)
                    }
                } else {
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
        })
    }
}

    
        return(
            <div>
                <br/>
                <Link to="/" style={{ textDecoration: 'none', position: 'absolute', marginLeft: 20 }}>
                    <Fab color="active" size="small">
                        <HomeIcon />
                    </Fab>
                </Link>
                <Stack direction="row" spacing={5} alignItems="center" justifyContent="center">
                    <Button variant="contained" color="success" onClick={handleShowAdd}>
                        New Event
                    </Button>
                    <ToggleButtonGroup color="primary" value={filterToggle} exclusive onChange={(e) => handleFilterToggle(e)}>
                        <ToggleButton value="All">All</ToggleButton>
                        <ToggleButton value="Group">Group</ToggleButton>
                        <ToggleButton value="Personal">Personal</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <br/>
                <Calendar
                localizer={localizer}
                events={showEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 900 }}
                defaultView={Views.MONTH}
                // backgroundEvents={myBackgroundEvents}
                selected={selected}
                onSelectEvent={handleSelected}
                eventPropGetter={eventStyleGetter}
                />
                <AddEventForm showAdd={showAdd} setShowAdd={setShowAdd} currentUser={currentUser} handleNewEventSubmit={handleNewEventSubmit} adminGroups={adminGroups}/>
                {selected ? <EventDetails show={showDetails} setShow={setShowDetails} event={selected} handleEditSubmit={handleEditSubmit} currentUser={currentUser} handleDeleteEvent={handleDeleteEvent}/> : null}
            </div>
        )
}

export default DisplayCalendar
