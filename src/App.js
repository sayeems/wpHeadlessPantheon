import './App.css';
import {Grid, Container} from '@mui/material';
import TopHeader from './TopHeader';
import Header from './Header';
import Sidebar from './Sidebar';
import Products from './Products';
import SingleProduct from './SingleProduct';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {useState, useContext} from 'react';

export const CartContext = React.createContext();

function App() {
  const [count, setCount] = useState(0);

  const addToCart = () => {
      setCount( prevCount => prevCount+1);
      console.log('sayeem');
  }

  return (
    <div className="App">
      <Router>
      <TopHeader />
      <Header count={count} />
      <CartContext.Provider value={addToCart}>
      <div className="theContent">
        <Container style={{marginTop:'30px'}}>
          <Grid container>
            <Sidebar />
              <Switch>
                <Route exact path="/" component={Products} />
                <Route path="/:id" component={SingleProduct} />
              </Switch>
          </Grid>
        </Container>
      </div>
      </CartContext.Provider>
      </Router>
    </div>
  );
}

export default App;
