import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/products';
import { addItemToCart } from '../../store/reducers/cart/actionCreators';
import { selectCart } from '../../store/reducers/cart/selectors';
import Button from '../Button';
import { ProductCardContainer } from './style';

const ProductCard = ({ product }: {product: Product}) => {
  const { name, price, imageUrl } = product;

  const cartProducts = useSelector(selectCart);

  const dispatch = useDispatch();

  const addProductToCart =  () => dispatch(addItemToCart(cartProducts, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button variant='inverted' onClick={addProductToCart}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;