import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import { CategoriesContext } from '../../../context/products';
import { Product } from '../../../models/products';
import ProductCard from '../../../components/product-card';

const Category = () => {
    
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState<Product[]>([]); 

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
