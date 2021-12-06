import {Grid, 
    Typography, 
    Container, 
    Paper, 
    Divider, 
    IconButton, 
    Stack, 
    Badge, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {FormatListBulleted, Category} from '@mui/icons-material';
import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();
    const baseUrl = 'https://dev-wpsayeem.pantheonsite.io/wp-json/';
    const consumer_key = "ck_c329e792c17199570591fac87fdedba24d51dc38";
    const consumer_secret = "cs_b6ac8847b7af33d51dca2660a4bcf1529578f37e";

    useEffect(() => {
        const fetchCategories= async () => {
            setLoading(true);
            const data = await axios.get(`${baseUrl}wc/v3/products/categories?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`);
            setCategories(data.data);
            setLoading(false);
        }
        return fetchCategories();
    },[]);

    return ( 
        <Grid item xs={5} sm={4} md={2}>
            <Paper>
                <List>
                    <ListItem>
                            <ListItemIcon>
                                <FormatListBulleted />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                    </ListItem>
                    <Divider />
                    {!loading && 
                    
                    categories.map(cat=>
                        <ListItem key={`cat_${cat.id}`} disablePadding>
                            <ListItemButton to={`/category/${cat.id}`} component={NavLink} activeClassName="active" disablepadding>
                                <ListItemIcon>
                                    <Category />
                                </ListItemIcon>
                                <ListItemText primary={cat.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                    
                    }
                </List>
            </Paper>
        </Grid>
     );
}
 
export default Sidebar;