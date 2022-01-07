import React from 'react';
import { useNavigate } from 'react-router-dom';

function get_coords(radian_interval, radius) {
    return {
        x: Math.cos(radian_interval) * radius,
        y: Math.sin(radian_interval) * radius
    }
}

function Card(props) {
    let coord = get_coords(props.radian_interval, props.radius);
    let history = useNavigate();

    function handleClick () {
        // props.setGroupId(props.server.id)
        localStorage.setItem('groupId', props.server.id)
        history("/group")
    }

    if(props.server) {
        return (
            <div style={{ ...styles.card, left: `${props.center.x + coord.x}px`, top: `${props.center.y - coord.y}px` }} onClick={handleClick}>
                <img className='group-card' alt="ok" src={props.server.group_picture ? props.server.group_picture : 'http://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'} style={{ width: '100%', height: '100%' }} />
            </div>
        )
    } else return null   
}

const styles = {
    card: {
        margin: '0',
        padding: '0',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'blue',
    }
}

export default Card;