import React from 'react'

const Product = (props) => {
 props = props.product;
 console.log(props)
  return (
    <div>
      <div>
          <img src="/images/cart-pizza3.png" alt="pizza" />
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{props.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4 ">
            {props.size}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4 ">
            <span>₹ {props.price}</span>
            <button className="bg-yellow-500 py-1 px-4 rounded-full font-bold">
              ADD
            </button>
          </div>
        </div>
    </div>
  )
}

export default Product
