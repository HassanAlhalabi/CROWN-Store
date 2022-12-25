import { useContext } from 'react';

import shoppingIcon from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart';

import './style.scss';

const CartIcon = ({toggleCart}: {toggleCart: () => void}) => {

  const { cartCount } = useContext(CartContext);

  return (
    <div className='cart-icon-container' onClick={toggleCart}>
      <img src={shoppingIcon} className='shopping-icon' /> 
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;