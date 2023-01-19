import { Route, Routes } from 'react-router-dom';
import CategoryPreview from '../../components/category-preview';
import Category from './category';
import './style.scss';

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;