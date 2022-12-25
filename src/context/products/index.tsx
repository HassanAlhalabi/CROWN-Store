import { createContext, ReactNode, useState } from "react";
import PRODUCTS from '../../../shop-data.json';
import { Product } from "../../models/products";


export const ProductsContext = createContext<{products: Product[]}>({
    products: []
})


export const ProductsProvider = ({children}:{children: ReactNode}) => {

    const [products, setProducts] = useState(PRODUCTS);

    return <ProductsContext.Provider value={{products}}>
                {children}
            </ProductsContext.Provider>

}