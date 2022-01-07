import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setCurrentUser }){

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})

  let history = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault()

		const configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData)
		}

		fetch('/login', configObj).then((resp) =>{ 
			if (resp.ok) {
				resp.json().then((user) => {
          setCurrentUser(user)
          history('/')
        })
			  } else {
          resp.json().then((errors) => {
            alert(errors.error);
          })
			  }
		})

		setFormData({
			username: '',
			password: ''
		})
	}

	return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            marginLeft: -9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
			  value={formData.username}
			  onChange={(e) => setFormData({...formData, username: e.target.value})}
            style={{backgroundColor: '#dbdbdb', borderRadius: 10}}/>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
			  value={formData.password}
			  onChange={(e) => setFormData({...formData, password: e.target.value})}
        style={{backgroundColor: '#dbdbdb', borderRadius: 10}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2" style={{color: '#ffffff', textDecoration: 'none'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2" style={{color: '#ffffff', textDecoration: 'none'}}>
                  {"Home"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
	)
}

export default Login