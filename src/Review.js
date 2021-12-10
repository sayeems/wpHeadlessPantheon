import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review({total, cart, shipping}) {

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Avatar src={product.image} variant="rounded" />
            </ListItemAvatar>
            <ListItemText primary={product.name} secondary={`৳${product.price} × ${product.quantity}`}  />
            <Typography variant="body2">{`৳${product.price * product.quantity}`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`৳${total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${shipping.first_name} ${shipping.last_name}`}</Typography>
          <Typography gutterBottom>{shipping.address_1}</Typography>
          <Typography gutterBottom>{shipping.address_2}</Typography>
          <Typography gutterBottom>{shipping.phone}</Typography>
        </Grid>
      </Grid>
    </>
  );
}