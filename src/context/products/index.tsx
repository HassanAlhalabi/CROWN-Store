import { createContext, ReactNode, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../firebase";


export const CategoriesContext = createContext({
    categoriesMap: {},
});
  


export const CategoriesProvider = ({children}:{children: ReactNode}) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments('categories');
        setCategoriesMap(categoryMap);
      };
      getCategoriesMap();
    }, []);

    return  <CategoriesContext.Provider value={{categoriesMap}}>
                {children}
            </CategoriesContext.Provider>

}