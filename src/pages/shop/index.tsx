import { Fragment, useContext } from 'react';
import ProductCard from '../../components/product-card';
import { CategoriesContext } from '../../context/products';
import { Product } from '../../models/products';

import './style.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categoriesMap[title].map((product: Product) => (
            <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Shop;