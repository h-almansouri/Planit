import { useEffect, useState } from "react"
import UserList from "./UserList"
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Fab from '@mui/material/Fab';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Message from "./Message";

function GroupPage ({currentUser}) {
    const [groupData, setGroupData] = useState(null)
    const [isJoined, setIsJoined] = useState(false)
    const [messages, setMessages] = useState([])
    const groupID = localStorage.getItem('groupId')
    useEffect(() => {
        fetch(`/groups/${groupID}`)
            .then(res => res.json())
            .then(data =>{
                 setGroupData(data)
                 setIsJoined(data.user_bool)
            })
    }, [])
    const [value, setValue] = useState();

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value)
    };

    useEffect(() => {
        fetch(`/messages`)
        .then(res => res.json())
        .then(data => {
            setMessages(data)
        })
    }, [])
    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
    }

    const handleJoin = () => {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                group_id: groupID
            })
        }

        fetch('/joined_groups', configObj).then(res => {
            if(res.ok){
                setIsJoined(true)
            }else{
                res.json().then((errors => {
                    console.log(errors)
                }))
            }
        })
    }

    if(groupData) {
        const userArray = groupData.all_users?.map(user => <UserList user={user} key={user.id}/>)
        const messageArray = messages.map(message => <Message currentUser={currentUser} message={message} groupID={groupID}/>)
        return(
            <div>
                <Link to="/" style={{ textDecoration: 'none', position: 'absolute', marginLeft: 20 }}>
                    <Fab color="active" size="small">
                        <HomeIcon />
                    </Fab>
                </Link>
                <h1 style={{margin: 'auto', textAlign: 'center'}}>{groupData.name}</h1>
                {/* <Button color="error" onClick={handleLeave} variant="contained" style={{position: 'relative', marginLeft: "90%", marginTop: -80}}>Leave Group</Button> */}
                {userArray}
                {messageArray}
                {/* <Message currentUser={currentUser}/> */}
                <div style={{textAlign: 'center'}}>
                    {isJoined ? 
                    <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Input stuff"
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={handleChange}
                    />
                    : 
                    <Button variant="contained" onClick={handleJoin}>Join Group</Button>
                    }
                </div>
            </div>
        )
    } else return null   
}

export default GroupPage
