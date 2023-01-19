import { Fragment, useContext } from 'react';
import { Link,  } from 'react-router-dom';
import { CategoriesContext } from '../../context/products';
import ProductCard from '../product-card';

import './style.scss';

const CategoryPreview = () => {
  const {categoriesMap} = useContext(CategoriesContext)
  
  return(
    <>
    {Object.keys(categoriesMap)?.map((title) => (
        <Fragment key={title}>
           <div className='category-preview-container'>
              <h2>
                <Link to={title}>
                  <span className='title'>{title.toUpperCase()}</span>
                </Link>
              </h2>
              <div className='preview'>
                {categoriesMap[title]
                  .filter((_, idx) => idx < 4)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
        </Fragment>
      ))
    }
    </>
  )
  
}

export default CategoryPreview;