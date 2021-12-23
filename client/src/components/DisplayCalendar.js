import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useState} from 'react'
import EventDetails from './EventDetails'

const localizer = momentLocalizer(moment)

function DisplayCalendar(){

const [selected, setSelected] = useState();

const handleSelected = (event) => {
    setSelected(event);
    console.log(event);
}

    return(
        <div>
            <Calendar
            localizer={localizer}
            // events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 900 }}
            defaultView={Views.MONTH}
            selected={selected}
            onSelectEvent={handleSelected}
            />
            <EventDetails event={selected}/>
        </div>
    )
}

export default DisplayCalendar
