import {useState, useEffect} from 'react'
import GroupCircle from './GroupCircle'

function HomePage({setCurrentUser}){

    const [allGroups, setAllGroups] = useState([])

    useEffect(() => {
        fetch('/my_total_groups')
        .then(res => res.json())
        .then(data =>{
            setAllGroups(data.all_groups)
        })
      }, [])

    const handleLogout = () => {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
    }

    return(
        <div>
            homepage
            <button onClick={handleLogout}>logout</button>
            <GroupCircle array={allGroups} />
        </div>
    )
}

export default HomePage