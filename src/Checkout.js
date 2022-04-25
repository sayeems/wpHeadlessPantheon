import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Divider from "@mui/material/Divider";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./App";

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout = (props) => {
  const baseUrl = "https://dev-wpsayeem.pantheonsite.io/wp-json/";
  const consumer_key = "ck_0dfa7e7c6aa6ed4056bfd95ad19e58cf7f6c12a7";
  const consumer_secret = "cs_a5d1fc54dee6186d61e4f4caa99372a0157961aa";

  const [activeStep, setActiveStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(false);
  const [createAccountInfo, setCreateAccountInfo] = useState();

  const appData = useContext(CartContext);

  const history = useHistory();
  const [addressData, setAddressData] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
    sign: "false",
    createAccount: "false",
  });
  const [paymentData, setPaymentData] = useState();
  const [cartPAyload, setCartPayload] = useState();
  const [cart, setCart] = useState();

  const handleAddressData = (addressKey, addressValue) => {
    setAddressData({ ...addressData, [addressKey]: addressValue });
  };

  useEffect(() => {
    const getCartData = async () => {
      let emptyArray = [];
      let cartTotal = 0;
      const data = localStorage.getItem("__cart");
      const userData = JSON.parse(localStorage.getItem("__wp"));
      if (data == null || data == "[]") {
        history.push("/");
      } else {
        JSON.parse(localStorage.getItem("__cart")).map((c) => {
          emptyArray.push({
            product_id: c.id,
            quantity: c.quantity,
          });
          cartTotal = cartTotal + parseInt(c.price) * parseInt(c.quantity);
        });
        setCartPayload(emptyArray);
        setTotal(cartTotal);
        setCart(JSON.parse(localStorage.getItem("__cart")));
      }

      if (userData != null) {
        axios
          .get(
            `${baseUrl}wc/v3/customers/${userData.user_id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`
          )
          .then((res) => {
            const { email, last_name, first_name, username, billing } =
              res.data;
            console.log(res.data);
            setAddressData({
              ...addressData,
              ...billing,
              ["email"]: email,
              username,
              ["last_name"]: last_name,
              ["first_name"]: first_name,
              ["sign"]: "true",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    return getCartData();
  }, []);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      // get form data here
      let payload = {
        payment_method: "cod",
        payment_method_title: "Cash on Delivery",
        set_paid: false,
        billing: addressData,
        shipping: addressData,
        line_items: cartPAyload,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "0.00",
          },
        ],
      };
      setLoading(true);
      axios
        .post(
          `${baseUrl}wc/v3/orders?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`,
          payload
        )
        .then((res) => {
          setOrderNumber(res.data.id);
          localStorage.removeItem("__cart");
          setLoading(false);
          setSuccess(true);
          appData.emptyCart();
        })
        .catch((error) => {
          setLoading(false);
          setSuccess(false);
        });

      // create account
      if (localStorage.getItem("__wp") == null) {
        if (addressData.createAccount) {
          const {
            email,
            first_name,
            last_name,
            username,
            password,
            phone,
            address_1,
            address_2,
            city,
            state,
            postcode,
            country,
          } = addressData;
          if (username && password) {
            axios
              .post(
                `${baseUrl}wc/v3/customers?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`,
                {
                  email,
                  first_name,
                  last_name,
                  username,
                  password,
                  billing: {
                    first_name,
                    last_name,
                    address_1,
                    address_2,
                    city,
                    state,
                    postcode,
                    country,
                    email,
                    phone,
                  },
                }
              )
              .then((res) => {
                setCreateAccountInfo("Your account was created!");
              })
              .catch((err) => {
                setCreateAccountInfo(err.message);
              });
          } else {
            setCreateAccountInfo(
              "Username and password was not given properly :("
            );
          }
        }
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm data={addressData} updateData={handleAddressData} />
        );
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review total={total} cart={cart} shipping={addressData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid item xs={7} sm={8} md={10} style={{ paddingLeft: "15px" }}>
      <Container component="main" sx={{ mb: 4 }}>
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
                {loading && (
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                  </Box>
                )}
                {!loading && success && (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #{orderNumber}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                    {addressData.createAccount && (
                      <>
                        <Divider />
                        <Typography variant="subtitle1">
                          {createAccountInfo}
                        </Typography>
                      </>
                    )}
                  </>
                )}
                {!loading && !success && (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Sorry, something went wrong!
                    </Typography>
                    <Typography variant="subtitle1">
                      Check your network connection, if that is okay try to
                      resubmit the order. sorry for the inconvenience.
                    </Typography>
                    {addressData.createAccount && (
                      <>
                        <Divider />
                        <Typography variant="subtitle1">
                          {createAccountInfo}
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </Container>
    </Grid>
  );
};

export default Checkout;
