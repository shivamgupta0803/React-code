import { useContext, useEffect, useState } from "react";
import CartContext from "../CartContext";
import MyComponent from './OrderCompleted'

const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
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
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    if(!cart.items[productId]){
      cart.items[productId] = 0;
    }
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

  const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  };

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updatedProductsList = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProductsList);
  };

const handleOrderNow = () =>{
  window.alert('hey you placed your order Thank you!')
  setProducts([]);
  setCart({});

}


  return (
  products.length ? 
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12" key={product.id}>
              <div className="flex items-center justify-between">
                <div className="flex item-center">
                  <img
                    className="h-16"
                    src={product.image}
                    alt=" not available"
                  />
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
                <span>₹ {getSum(product.id, product.price)}</span>
                <button
                  onClick={() => handleDelete(product.id, )}
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total :</b> ₹ {total}
      </div>
      <div className="text-right mt-6">
        <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  : 
  <>
  <MyComponent/>
  </>
  )
};

export default Cart;
