import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginbg from './images/bazar-login.jpeg';
import theLogo from './images/bazar_logo.svg';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const theme = createTheme();

const SignIn = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const checkLoginState = () => {
            const loginState = localStorage.getItem('__wp');
            if(loginState != null){
                history.push('/');
            }
            
        }
        return checkLoginState();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        setError('');
        let username = data.get('username');
        let password = data.get('password');
        await axios.post('https://dev-wpsayeem.pantheonsite.io/wp-json/jwt-auth/v1/token', {
            username,
            password
        }).then(response=>{
            localStorage.setItem("__wp", JSON.stringify(response.data));
            history.push('/');
        }).catch(error=>{
            setError('Incorrect username or password');
            setLoading(false);
        });
    };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginbg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
            <img src={theLogo} alt="logo" style={{position:'absolute', left:'10px', top:'10px'}} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username/Email"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <p style={{color:'red', marginBottom:'2px', marginTop:'0px', textAlign:'center'}}>{error}</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignIn;