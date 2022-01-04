import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useState, useEffect} from 'react'
import 'react-big-calendar/lib/sass/styles.scss';


const localizer = momentLocalizer(moment)

function DisplayCalendar({currentUser}){

    const [selected, setSelected] = useState();
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        fetch('/all_events')
        .then(res => res.json())
        .then(data =>{
            setAllEvents(data.list_all_events);
        })
      }, [])

      console.log(allEvents)

    const handleSelected = (event) => {
        setSelected(event);
        console.log(event);
    }
    
    const myEventsList = [ {
        id: 1,
        title: "Christmas",
        start: new Date(2021, 11, 25, 10),
        end: new Date(2021, 11, 25, 12),
        desc: "Christmas day, 2021",
        allDay: true,
        color: "#357a2c",
        outlineColor: "#fa02dd"
      },
      {
        id: 2,
        title: "Break",
        start: new Date(2021, 11, 23, 9),
        end: new Date(2021, 11, 25, 11),
        desc: "Holiday break"
      },
      {
        id: 3,
        title: "Packers vs Browns",
        start: new Date(2021, 11, 25, 15, 25),
        end: new Date(2021, 11, 25, 19),
        desc: "NFL game",
        color: 'pink'
      }
    ]


    console.log(myEventsList)

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.color
        };
        return {
            style: style
        };
    }

    
        return(
            <div>
                <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 900 }}
                defaultView={Views.MONTH}
                // backgroundEvents={myBackgroundEvents}
                selected={selected}
                onSelectEvent={handleSelected}
                eventPropGetter={eventStyleGetter}
                />
            </div>
        )
}

export default DisplayCalendar
