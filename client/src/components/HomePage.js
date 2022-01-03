
function HomePage({setCurrentUser}){

    const handleLogout = () => {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
    }

    return(
        <div className="home-div">
            <div className="home-nav">
                <span>Calender</span>
                <button>Logout</button>
            </div>
            <div className="home-prof">
                <span className="prof-pic">Prof Pic</span>
                <h2>Welcome Username!</h2>
            </div>
            <div className="home-servers-list">
                <span className="home-server" >Serv1</span>
                <span className="home-server">Serv2</span>
                <span className="home-server">Serv3</span>
                <span className="home-server">Serv4</span>
                <span className="home-server">+</span>
            </div>
            <div>
              homepage
              <button onClick={handleLogout}>logout</button>
            </div>
      </div>
    )
}

export default HomePage