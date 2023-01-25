import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import { Product } from '../../../models/products';
import ProductCard from '../../../components/product-card';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap } from '../../../store/reducers/categories/selectors';

const Category = () => {
    
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState<Product[]>([]); 

    console.log('Categories Rerender');

    useEffect(() => {
        if(category) {
            setProducts(categoriesMap[category]);   
        }
    },[category, categoriesMap]);

    return (
        <>
           <h2 className='category-title'>{category}</h2>
            <div className='category-container'>
                {
                    products?.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </>

  )
}

export default Category
