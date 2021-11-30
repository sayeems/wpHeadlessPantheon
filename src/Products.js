import {
    Grid,
    Typography,
    Container,
    Paper,
    Divider,
    IconButton,
    Button,
    Stack,
    Badge,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Rating,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction
} from '@mui/material';
import { AddShoppingCart, Visibility, Favorite } from '@mui/icons-material';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './App';

const Products = (props) => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const baseUrl = 'https://dev-wpsayeem.pantheonsite.io/wp-json/';
    const consumer_key = "ck_c329e792c17199570591fac87fdedba24d51dc38";
    const consumer_secret = "cs_b6ac8847b7af33d51dca2660a4bcf1529578f37e";

    const add = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await axios.get(`${baseUrl}wc/v3/products?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`);
            setProducts(data.data);
            console.log(data.data);
            console.log(props);
            setLoading(false);
        }
        return fetchProduct();
    }, []);
    //sayeem

    return (
        <Grid item xs={10} style={{ paddingLeft: '15px' }}>
            <h3>Products</h3>
            <Divider />
            <Grid container spacing={2}>
                {!loading &&
                    products.map(item =>
                        <Grid item xs={4} style={{ marginTop: '10px' }} key={item.id}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={item.images[0].src}
                                >
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography gutterbottom variant="p" component="div">
                                        Price: {item.price}
                                    </Typography>
                                    <Typography gutterbottom variant="p" component="div">
                                        <Rating name="read-only" value={item.average_rating} readOnly />
                                    </Typography>
                                </CardContent>
                                <SpeedDial
                                    ariaLabel="ecommerce actions"
                                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                    icon={<SpeedDialIcon />}
                                    size="small"
                                >
                                    <SpeedDialAction
                                        icon={<AddShoppingCart />}
                                        tooltipTitle="Add to Cart"
                                        onClick={add}
                                    />
                                    <SpeedDialAction
                                        icon={<Visibility />}
                                        tooltipTitle="View Details"
                                        to={`/${item.id}`}
                                        component={Link}
                                    />
                                    <SpeedDialAction
                                        icon={<Favorite />}
                                        tooltipTitle="Favourite"
                                    />
                                </SpeedDial>
                                {item.on_sale ? <p className="sale">sale</p> : ''}
                            </Card>
                        </Grid>
                    )
                }
                {loading &&
                    [1, 2, 3, 4, 5, 6].map(rep => (
                        <Grid item xs={12} md={4} key={rep}>
                            <Card>
                                <Skeleton variant="rectangular" height={300} />
                                <Skeleton sx={{ mt: 1, mb: 0.3 }} variant="rectangular" height={16} />
                                <Skeleton variant="text" />
                                <Skeleton sx={{ mb: 1 }} variant="text" />
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
        </Grid>
    );
}

export default Products;