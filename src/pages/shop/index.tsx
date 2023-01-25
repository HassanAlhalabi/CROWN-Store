import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPreview from '../../components/category-preview';
import { getCategoriesAndDocuments } from '../../firebase';
import Category from './category';
import './style.scss';
import { useDispatch } from 'react-redux/es/exports';
import { setCategories } from '../../store/reducers/categories/actionsCreators';

const Shop = () => {

  const disptach = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments('categories');
      disptach(setCategories(categories));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;