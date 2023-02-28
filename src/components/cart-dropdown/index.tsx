import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import CartItem from '../cart-item';
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './style';

const CartDropdown = () => {

  const cartItems = useSelector(state => state.cart.cartItems);

  const navigate = useNavigate();

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems?.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItemsContainer>
      <Button onClick={() => navigate('/checkout')}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;