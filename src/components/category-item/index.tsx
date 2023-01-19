import { ICategory } from '../../models/category';
import { CategoryItemContainer, CategoryBodyContainer, BackgroundImage } from './style';

const CategoryItem = ({ category }: {category: ICategory}) => {
  const { imageUrl, title } = category;
  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
};

export default CategoryItem;