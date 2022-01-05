import { useEffect, useState } from "react"
import UserList from "./UserList"
import TextField from '@mui/material/TextField';

function GroupPage ({groupId}) {
    const [groupData, setGroupData] = useState()
    useEffect(() => {
        fetch(`/groups/${groupId}`)
            .then(res => res.json())
            .then(data => setGroupData(data))
    }, [])
    const [value, setValue] = useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    if(groupData) {
        const userArray = groupData.all_users.map(user => <UserList user={user}/>)
        return(
            <div>
                {userArray}
                <div>
                    <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Input stuff"
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={handleChange}
                    />
                </div>
            </div>
        )
    } else return null   
}

export default GroupPage
