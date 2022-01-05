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

const localizer = momentLocalizer(moment)

function DisplayCalendar({currentUser}){

    const [selected, setSelected] = useState();
    const [allEvents, setAllEvents] = useState([]);
    const [personalEvents, setPersonalEvents] = useState([]);
    const [groupEvents, setGroupEvents] = useState([]);
    const [filterToggle, setFilterToggle] = useState("All")
    const [selectedEvents, setSelectedEvents] = useState([])
    const [showAdd, setShowAdd] = useState(false);

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
        console.log(event);
    }

    const handleShow = () => setShowAdd(true);
    
    // const myEventsList = [ {
    //     id: 1,
    //     title: "Christmas",
    //     start: new Date(2021, 11, 25, 10),
    //     end: new Date(2021, 11, 25, 12),
    //     desc: "Christmas day, 2021",
    //     allDay: true,
    //     color: "#357a2c",
    //     outlineColor: "#fa02dd"
    //   },
    //   {
    //     id: 2,
    //     title: "Break",
    //     start: new Date(2021, 11, 23, 9),
    //     end: new Date(2021, 11, 25, 11),
    //     desc: "Holiday break"
    //   },
    //   {
    //     id: 3,
    //     title: "Packers vs Browns",
    //     start: new Date(2021, 11, 25, 15, 25),
    //     end: new Date(2021, 11, 25, 19),
    //     desc: "NFL game",
    //     color: 'pink'
    //   }
    // ]

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

    console.log(groupEvents)

    
        return(
            <div>
                <br/>
                <Link to="/" style={{ textDecoration: 'none', position: 'absolute', marginLeft: 20 }}>
                    <Fab color="active" size="small">
                        <HomeIcon />
                    </Fab>
                </Link>
                <Stack direction="row" spacing={5} alignItems="center" justifyContent="center">
                    <Button variant="contained" color="success" onClick={handleShow}>
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
                <AddEventForm showAdd={showAdd} setShowAdd={setShowAdd} currentUser={currentUser} setGroupEvents={setGroupEvents} setPersonalEvents={setPersonalEvents} groupEvents={groupEvents} personalEvents={personalEvents} allEvents={allEvents} setAllEvents={setAllEvents}/>
            </div>
        )
}

export default DisplayCalendar
