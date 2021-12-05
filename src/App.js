import './App.css';
import {Grid, Container} from '@mui/material';
import TopHeader from './TopHeader';
import Header from './Header';
import Sidebar from './Sidebar';
import Products from './Products';
import SingleProduct from './SingleProduct';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {useState, useContext} from 'react';
import CategoryItem from './CategoryItem';
import SignIn from './SignIn';

export const CartContext = React.createContext();

function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  const appData = {
    buyNow(id, name, price, imagePath){
      setCart([...cart, {
        id,
        name,
        price,
        image: imagePath,
        quantity: 1
      }]);
      setCount( prevCount => prevCount+1);
    },
  }

  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route path="/">
        <TopHeader />
          <Header count={count} cart={cart} />
          <CartContext.Provider value={appData}>
            <div className="theContent">
              <Container style={{marginTop:'30px'}}>
                <Grid container>
                  <Sidebar />
                    <Switch>
                      <Route exact path="/" component={Products} />
                      <Route path="/category/:id" component={CategoryItem} />
                      <Route path="/products/:id" component={SingleProduct} />
                    </Switch>
                </Grid>
              </Container>
            </div>
          </CartContext.Provider>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
