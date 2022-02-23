import './App.css';
import { useState, useEffect } from 'react';
import LoggedIn from './components/LoggedIn'
import LoggedOut from './components/LoggedOut'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/me", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setAuthenticated(true);
        });
      } else {
        setAuthenticated(true);
      }
    });
  }, []);

  if (!authenticated) {
    return <div></div>;
  }

  return (
      <>
        {currentUser ? (<LoggedIn setCurrentUser={setCurrentUser} currentUser={currentUser}/>) : (<LoggedOut setCurrentUser={setCurrentUser} currentUser={currentUser}/>)}
      </>
  );
}

export default App;
