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
        <div>
            <Button onClick={handleLogin}>Login</Button>
            <Button variant="success" onClick={handleSignUp}>Signup</Button>
        </div>
    )
}

export default LandingPage