import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const [total, setTotal] = useState(0);
    const history = useHistory();
    const [addressData, setAddressData] = useState(
        {
            first_name: "sayeem",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            email: "",
            phone: "",
        }
    );
    const [paymentData, setPaymentData] = useState();
    const [cartPAyload, setCartPayload] = useState();
    const [cart, setCart] = useState();

    const handleAddressData = (addressKey, addressValue) => {
        setAddressData(
            {...addressData,
            [addressKey]: addressValue}
        )
    }

    useEffect(() => {
        const getCartData = () => {
            let emptyArray = [];
            let cartTotal = 0;
            const data = localStorage.getItem('__cart');
            if(data == null || data == "[]"){
                history.push('/');
            }else{
                JSON.parse(localStorage.getItem("__cart")).map(c=>{
                    emptyArray.push({
                        product_id: c.id,
                        quantity: c.quantity
                    });
                    cartTotal = cartTotal + (parseInt(c.price) * parseInt(c.quantity));
                });
                setCartPayload(emptyArray);
                setTotal(cartTotal);
                setCart(JSON.parse(localStorage.getItem("__cart")));
            }
        }
        return getCartData();
    },[]);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if(activeStep === steps.length -1 ){
            // get form data here
        }
    };

    function getStepContent(step) {
        switch (step) {
          case 0:
            return <AddressForm data={addressData} updateData={handleAddressData} />;
          case 1:
            return <PaymentForm />;
          case 2:
            return <Review total={total} cart={cart} />;
          default:
            throw new Error('Unknown step');
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Grid item xs={7} sm={8} md={10} style={{ paddingLeft: '15px' }}>
            <Container component="main"  sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                        </Typography>
                    </>
                    ) : (
                    <>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Back
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                        </Box>
                    </>
                    )}
                </>
                </Paper>
            </Container>
        </Grid>
    );
}

export default Checkout;