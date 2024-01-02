import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home'
// import About from './pages/About'
import Navigation from './components/Navigation';
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import CartContext from "./CartContext";

const App = () => {

  const [cart, setCart] = useState({});


  useEffect(() => {
    const cart = window.localStorage.getItem('cart') 
    setCart(JSON.parse(cart));  
    
  }, [])
  
 useEffect(()=>{
    setCart(prev=>{
      window.localStorage.setItem('cart', JSON.stringify(prev));
      return prev
    })
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{cart, setCart}}>
          <Navigation />
          <Routes>
            <Route path="/" Component={Home}></Route>
            {/* <Route path="/about" Component={About}></Route> */}
            <Route path="/products" exact Component={ProductsPage}></Route>
            <Route path="/products/:id" Component={SingleProduct}></Route>
            <Route path="/cart" Component={Cart}></Route>
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
};
export default App;
