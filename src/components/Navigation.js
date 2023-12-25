import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Navigation = () => {
  const cartStyle = {
    backgroundColor: "#F59E0D",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "50px",
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between ">
        <Link to="/">
          <img
            style={{ height: 45 }}
            src="/images/pizza-logo.jpg"
            alt="Image no available"
          />
        </Link>
        <ul className="flex items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartStyle}>
                <span className="">10</span>
                <img
                  className="ml-2"
                  style={{ height: 20 }}
                  src="/images/basket.png"
                  alt="cart-logo"
                />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;