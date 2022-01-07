
function Message ({currentUser, message, groupID}) {
    // console.log(message)
    // console.log("messageid", message.group.id)
    // console.log("groupid", groupID)
    if(message.group.id == groupID) {
        console.log(message.message)
        return (
            <div className="user-text">
                <img className="group-prof-pic" src={currentUser.profile_picture}/>
                <p className="text-text">{message.message}</p>
            </div>   
        )
    } else return null
    
}

export default Message