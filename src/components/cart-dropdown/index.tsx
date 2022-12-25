import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart';
import Button from '../Button';
import CartItem from '../cart-item';

import './style.scss';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems?.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Button onClick={() => navigate('/checkout')}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;