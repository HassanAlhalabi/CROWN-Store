import { useContext } from 'react';

import shoppingIcon from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart';
import { CartIconContainer, ItemCount, ShoppingIcon } from './style';


const CartIcon = ({toggleCart}: {toggleCart: () => void}) => {

  const { cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon src={shoppingIcon} /> 
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;