import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Navigation from './components/Navigation';
import Products from "./pages/Products";
import Cart from "./Cart";

const App = () => {
  return (
    <>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/about" Component={About}></Route>
          <Route path="/products" Component={Products}></Route>
          <Route path="/cart" Component={Cart}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
