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
    Alert,
    Drawer,
    Box,
    Button
} from '@mui/material';
import Logo from './images/bazar_logo.svg';
import {Search, Menu, Directions, Person, ShoppingCart, History, Settings, Logout, Delete, Add, Remove, ShoppingBasket} from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const TopHeader = ({count,cart, add, remove, delCart, cartSum}) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('');
    const [drawerState, setDrawerState] = useState({
        right: false,
      });
    const handleClick = (event) => {
        const loginState = localStorage.getItem('__wp');
        if(loginState != null){
            setAnchorEl(event.currentTarget);
           setEmail(JSON.parse(loginState).user_email);
           setAvatar(JSON.parse(loginState).avatar);
           setFullName(JSON.parse(loginState).full_name);
        }else{
            history.push('/signin');
        }
      };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
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
      const handleCheckout = () => {
        history.push('/checkout');
        setDrawerState({ ...drawerState, ['right']: open });
      }
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
          role="presentation"
        >
          <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{bgcolor:'#00b0ff'}}>
                        <ShoppingCart />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                primary={`${count} Items`}
                />
            </ListItem>
            {cart.map((cartData, index) => (
                <>
                    <Divider key={`cartDataDivider-${index}`} />
                    <ListItem 
                    key={`cartData-${index}`}
                    secondaryAction={
                        <>
                        <IconButton edge="end" aria-label="add" size="medium" onClick={()=>add(cartData.id)}>
                            <Add fontSize="inherit" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" color="warning" size="medium" onClick={()=>delCart(cartData.id)}>
                            <Delete fontSize="inherit" />
                        </IconButton>
                        <IconButton edge="end" aria-label="remove" size="medium" disabled={cartData.quantity <= 1} onClick={()=>remove(cartData.id)}>
                            <Remove fontSize="inherit" />
                        </IconButton>
                        </>
                    }
                    
                    >
                        <ListItemAvatar>
                            <Avatar src={cartData.image} variant="rounded"/>
                        </ListItemAvatar>
                        <ListItemText 
                        primary={cartData.name}
                        secondary={`৳${cartData.price} × ${cartData.quantity}`} 
                        />
                    </ListItem>
                </>
            ))}
            <Divider />
            <ListItem>
                <Button 
                sx={{bgcolor:'#00b0ff'}}  
                fullWidth 
                variant="contained" 
                startIcon={<ShoppingBasket />} 
                disabled={count<1}
                onClick={handleCheckout}
                >
                    Checkout [ ৳{cartSum} ]
                </Button>
            </ListItem>
          </List>
        </Box>
      );

    return (
        <div className="theHeader">
            {/* app drawer -- cart */}
            <Drawer
            anchor="right"
            open={drawerState['right']}
            onClose={toggleDrawer('right',false)}
            >
                {list('right')}
            </Drawer>
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
                                <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={fullName} secondary={email} />
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
                        <Stack direction="row" spacing={1}>
                            <IconButton aria-label="user" onClick={handleClick} size="large">
                                <Person fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="cart" onClick={toggleDrawer('right',true)} size="large">
                                <Badge badgeContent={count} color="primary">
                                    <ShoppingCart fontSize="inherit" />
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