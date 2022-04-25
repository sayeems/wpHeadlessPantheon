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
  Box,
  Rating,
} from "@mui/material";
import { FormatListBulleted, Category } from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "./App";

const SingleProduct = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const productId = match.params.id;
  const baseUrl = "https://dev-wpsayeem.pantheonsite.io/wp-json/";
  const consumer_key = "ck_0dfa7e7c6aa6ed4056bfd95ad19e58cf7f6c12a7";
  const consumer_secret = "cs_a5d1fc54dee6186d61e4f4caa99372a0157961aa";

  const appData = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await axios.get(
        `${baseUrl}wc/v3/products/${productId}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`
      );
      setProduct(data.data);
      // console.log(data.data);
      setLoading(false);
    };
    return fetchProduct();
  }, []);

  return (
    <Grid item xs={10} style={{ paddingLeft: "15px" }}>
      <Grid container spacing={2}>
        {!loading && (
          <>
            <Grid item xs={6}>
              <Box>
                <img
                  style={{ maxWidth: "100%" }}
                  src={product.images[0].src}
                  loading="lazy"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h4" component="div">
                {product.name}
              </Typography>
              <Typography gutterbottom variant="p" component="div">
                <Rating
                  name="read-only"
                  value={product.average_rating}
                  readOnly
                />
              </Typography>
              {product.on_sale ? (
                <p className="price">
                  ৳{product.price}{" "}
                  <del style={{ color: "red" }}>৳{product.regular_price}</del>
                </p>
              ) : (
                <p className="price">৳{product.price}</p>
              )}
              {/* <div dangerouslySetInnerHTML={{ __html: product.description}}></div> */}
              <Button
                onClick={() =>
                  appData.buyNow(
                    product.id,
                    product.name,
                    product.price,
                    product.images[0].src
                  )
                }
                variant="contained"
                color="primary"
              >
                BUY NOW
              </Button>
            </Grid>
          </>
        )}
        {loading && (
          <>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                sx={{ mt: 1, mb: 0.3 }}
                variant="rectangular"
                height={16}
              />
              <Skeleton variant="text" />
              <Skeleton sx={{ mb: 1 }} variant="text" />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SingleProduct;
