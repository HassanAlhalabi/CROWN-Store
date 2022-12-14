import { useContext } from 'react';
import ProductCard from '../../components/product-card';
import { ProductsContext } from '../../context/products';

import './style.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;