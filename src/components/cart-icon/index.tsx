import { useSelector } from 'react-redux';

import shoppingIcon from '../../assets/shopping-bag.svg';
import { selectCart, selectCartCount } from '../../store/reducers/cart/selectors';
import { CartIconContainer, ItemCount, ShoppingIcon } from './style';


const CartIcon = ({toggleCart}: {toggleCart: () => void}) => {

  const cartProducts = useSelector(selectCart);
  const cartCount = useSelector(selectCartCount);

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon src={shoppingIcon} /> 
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;