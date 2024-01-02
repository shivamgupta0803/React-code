import { useContext, useEffect, useState } from "react";
import CartContext from "../CartContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    // console.log('cart', Object.keys(cart.items));

    fetch("/api/product/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        products = products.product;
        setProducts(products);
      });
  }, [cart]);

  const getQty = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    let existingQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productId) => {
    let existingQty = cart.items[productId];
    if (existingQty === 0) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  return (
    !products.length ?
    <img className='mx-auto w-1/2 mt-12' src="/image/Empty-cart.png" alt='' />
:
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12">
              <div className="flex items-center justify-between">
                <div className="flex item-center">
                  <img className="h-16" src={product.image} />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decrement(product.id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">{getQty(product.id)}</b>
                  <button
                    onClick={() => {
                      increment(product.id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹ {product.price}</span>
                <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6"/>
            <div className="text-right">
                <b>Grand Total :</b> ₹ 1000
            </div>
            <div className="text-right mt-6">
                <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
            </div>
    </div>
  );
};

export default Cart;
