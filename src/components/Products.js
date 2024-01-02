import Product from "./Product";
import { useEffect, useState } from "react";



const Products = () => {

  // const { name } = useContext(CartContext)

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/product/:id`)
      .then(res => res.json())
      .then(products => {
        products = products.product
        setProducts(products);
      })
  })

  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products</h1>
      <div className="grid grid-cols-5 my-8 gap-24">
        {
          products.map(product => <Product key={product.id} product={product} />)
        }
      </div>
    </div>
  );
};

export default Products;
