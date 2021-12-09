import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useState, useEffect} from 'react';

export default function AddressForm({updateData,data}) {

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="first_name"
            name="first_name"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={data.first_name}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="last_name"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={data.last_name}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address_1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={data.address_1}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address_2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            defaultValue={data.address_2}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            defaultValue={data.city}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={data.state}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="postcode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            defaultValue={data.postcode}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            defaultValue={data.country}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="Your email address"
            variant="standard"
            defaultValue={data.email}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="Your mobile number"
            variant="standard"
            defaultValue={data.phone}
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange={(e)=>updateData(e.target.name, e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}