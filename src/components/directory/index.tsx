import { ICategory } from '../../models/category';
import CategoryItem from '../category-item';

import './style.scss';

const Directory = ({ categories }:{categories: ICategory[]}) => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;