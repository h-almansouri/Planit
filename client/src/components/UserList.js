
function UserList ({user}) {
    return (
        <div className="group-prof">
            <img src={user.profile_picture} className="group-prof-pic"/>
            <div title={user.username}>{user.username}</div>
        </div>
    )
}

export default UserList