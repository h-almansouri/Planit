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


function Signup({ setCurrentUser }) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: ''
  })

  let history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const configObj = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('/signup', configObj).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
          setCurrentUser(user);
          history('/')
        });
      } else {
        res.json().then((errors) => {
         alert(errors.errors);
        });
      }
    })

    setFormData({
      username: '',
      password: '',
      password_confirmation: ''
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            marginLeft: -15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={(e) => handleChange(e)}
                  value={formData.username}
                  style={{backgroundColor: '#dbdbdb', borderRadius: 10}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  style={{backgroundColor: '#dbdbdb', borderRadius: 10}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"
                  autoComplete="confirm-password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password_confirmation}
                  style={{backgroundColor: '#dbdbdb', borderRadius: 10}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{color: '#ffffff', textDecoration: 'none'}}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" style={{color: '#ffffff', textDecoration: 'none'}}>
                    Home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Signup