import {
    Grid, 
    Typography, 
    Container, 
    Paper, 
    Divider, 
    IconButton, 
    Stack, 
    Badge, 
    Popover,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Snackbar,
    Alert
} from '@mui/material';
import Logo from './images/bazar_logo.svg';
import {Search, Menu, Directions, Person, ShoppingCart, History, Settings, Logout} from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const TopHeader = ({count}) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [email, setEmail] = useState('');
    const handleClick = (event) => {
        const loginState = localStorage.getItem('__wp');
        if(loginState != null){
            setAnchorEl(event.currentTarget);
           setEmail(JSON.parse(loginState).user_email);
        }else{
            history.push('/signin');
        }
      };

      const handleSignOut = () => {
        localStorage.removeItem('__wp');
        setSnackOpen(true);
        setAnchorEl(false);
      }

      const handleSnackClose = () => {
        setSnackOpen(false);
      }
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

    return (
        <div className="theHeader">
            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert sx={{ width: '100%'}}>
                You have successfully signed out
                </Alert>
            </Snackbar> 
            <Container>
                <Grid container>
                    <Grid item xs={2}>
                        <Link to="/">
                        <img style={{paddingTop:'5px'}} src={Logo} alt="logo" />
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%' }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Product"
                                inputProps={{ 'aria-label': 'search product' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <Search />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                            >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton disabled>
                                        <ListItemAvatar>
                                            <Avatar color="primary" sx={{bgcolor:'pink'}}>
                                                {email ? email.split('')[0].toUpperCase() : ''}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={email} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <History />
                                    </ListItemIcon>
                                    <ListItemText primary="Orders" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleSignOut}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            </Popover>
                        <Stack style={{paddingTop:'10px'}} direction="row" spacing={1}>
                            <IconButton aria-label="user" onClick={handleClick}>
                                <Person fontZise="large" />
                            </IconButton>
                            <IconButton aria-label="cart">
                                <Badge badgeContent={count} color="primary">
                                    <ShoppingCart fontZise="large" />
                                </Badge>
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
     );
}
 
export default TopHeader;