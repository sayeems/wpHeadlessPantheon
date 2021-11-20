import {Grid, Typography, Container, Paper, Divider, IconButton, Stack, Badge} from '@mui/material';
import Logo from './images/bazar_logo.svg';
import {Search, Menu, Directions, Person, ShoppingCart} from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const TopHeader = ({count}) => {
    return (
        <div className="theHeader"> 
            <Container>
                <Grid container>
                    <Grid item xs={2}>
                        <Link to="/">
                        <img style={{paddingTop:'5px'}} src={Logo} alt="logo" />
                        </Link>
                    </Grid>
                    <Grid item xs={7}>
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
                    <Grid item xs={3}>
                        <Stack style={{paddingTop:'10px'}} direction="row" spacing={1}>
                            <IconButton aria-label="user">
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