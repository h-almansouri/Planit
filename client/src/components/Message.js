
function Message ({currentUser, message, groupID}) {
    if(message.group.id === groupID) {
        console.log(message.message)
    }
    return (
        <div className="user-text">
            <img className="group-prof-pic" src={currentUser.profile_picture}/>
            <p className="text-text">test text here</p>
        </div>   
    )
}

export default Message