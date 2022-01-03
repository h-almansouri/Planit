
function HomePage({setCurrentUser}){

    const handleLogout = () => {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
    }

    return(
        <div>
            homepage
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default HomePage