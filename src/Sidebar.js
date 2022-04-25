import {
  Grid,
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
} from "@mui/material";
import { FormatListBulleted, Category } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const baseUrl = "https://dev-wpsayeem.pantheonsite.io/wp-json/";
  const consumer_key = "ck_0dfa7e7c6aa6ed4056bfd95ad19e58cf7f6c12a7";
  const consumer_secret = "cs_a5d1fc54dee6186d61e4f4caa99372a0157961aa";

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await axios.get(
        `${baseUrl}wc/v3/products/categories?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`
      );
      setCategories(data.data);
      setLoading(false);
    };
    return fetchCategories();
  }, []);

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
            categories.map((cat) => (
              <>
                <ListItem key={`cat_${cat.id}`} disablePadding>
                  <ListItemButton
                    to={`/category/${cat.id}`}
                    component={NavLink}
                    activeClassName="active"
                    disablepadding
                  >
                    <ListItemIcon>
                      <Category />
                    </ListItemIcon>
                    <ListItemText primary={cat.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default Sidebar;
