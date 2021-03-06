import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

function LandingPage(){
    let history = useNavigate()

    function handleLogin () {
        console.log("login")
        history('/login')
    }
    function handleSignUp () {
        console.log("signup")
        history('/signup')
    }


    return(
        <div >
            <h1 className="planit-title">PLANIT</h1>
            <div className="login-buttons">
            <Button onClick={handleLogin} style={{marginRight: '5%'}}>Login</Button>
            <Button variant="info" onClick={handleSignUp} style={{marginLeft: '5%'}}>Signup</Button>
            </div>
            {/* <Button onClick={handleLogin} style={{marginTop: '65vh', marginLeft: '37%'}}>Login</Button>
            <Button variant="info" onClick={handleSignUp} style={{marginTop: '65vh', marginLeft: '20%'}}>Signup</Button> */}
        </div>
    )
}

export default LandingPage