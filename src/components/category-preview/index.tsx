import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link,  } from 'react-router-dom';
import { selectCategoriesMap } from '../../store/reducers/categories/selectors';

import ProductCard from '../product-card';

import './style.scss';

const CategoryPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log('Category Preview Rerender')

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