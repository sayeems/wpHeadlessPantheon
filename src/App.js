import './App.css';
import {Grid, Container} from '@mui/material';
import TopHeader from './TopHeader';
import Header from './Header';
import Sidebar from './Sidebar';
import Products from './Products';
import SingleProduct from './SingleProduct';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {useState, useContext, useEffect} from 'react';
import CategoryItem from './CategoryItem';
import SignIn from './SignIn';
import Checkout from './Checkout';

export const CartContext = React.createContext();

function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartSum, setCartSum] = useState(0);


  useEffect(() => {
    const syncAppData = () => {
      let total = 0;
      if(cart.length > 0){
        cart.map(sum => {
          total = total + (parseInt(sum.price) * parseInt(sum.quantity));
        });
      }
      setCartSum(total);
      setCount(cart.length);
      localStorage.setItem("__cart", JSON.stringify(cart));
    }
    return syncAppData();
  },[cart]);

  const appData = {
    buyNow(id, name, price, imagePath){
      let isUpdate=false; 
      for(let i=0; i<cart.length; i++){
        if(cart[i].id == id){
          isUpdate = true;
          break;
        }
      }
      if(!isUpdate){
        setCart([...cart, {
          id,
          name,
          price,
          image: imagePath,
          quantity: 1
        }]);
      }else{
        this.add(id);
      }
    },
    add(id){
      let newCart = JSON.stringify(cart);
      newCart = JSON.parse(newCart);
      let updateCart = newCart.map(c => {
        if(c.id == id){
          c.quantity = c.quantity + 1;
        }else{}
        return c;
      });
      setCart(updateCart);
    },
    remove(id){
      let newCart = JSON.stringify(cart);
      newCart = JSON.parse(newCart);
      let updateCart = newCart.map(c => {
        if(c.id == id){
          c.quantity = c.quantity - 1;
        }else{}
        return c;
      });
      setCart(updateCart);
    },
    delCart(id){
      let newCart = JSON.stringify(cart);
      newCart = JSON.parse(newCart);
      let updateCart = newCart.filter(c => {
        return c.id != id;
      });
      setCart(updateCart);
    }
  }

  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route path="/">
        <TopHeader />
          <Header 
          count={count} 
          cart={cart}
          add={appData.add}
          remove={appData.remove}
          delCart={appData.delCart}
          cartSum={cartSum}
          />
          <CartContext.Provider value={appData}>
            <div className="theContent">
              <Container style={{marginTop:'30px'}}>
                <Grid container>
                  <Sidebar />
                    <Switch>
                      <Route exact path="/" component={Products} />
                      <Route path="/category/:id" component={CategoryItem} />
                      <Route path="/products/:id" component={SingleProduct} />
                      <Route path="/checkout" component={Checkout} />
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
