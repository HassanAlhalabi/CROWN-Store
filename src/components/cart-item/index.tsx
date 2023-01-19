import { ICartItem } from '../../models/cart';
import { CartItemContainer, ItemDetails } from './style';

const CartItem = ({ cartItem }: {cartItem: ICartItem}) => {
  const { imageUrl, price, name, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;