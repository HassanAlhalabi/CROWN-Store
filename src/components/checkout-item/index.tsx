

import './style.scss';
import { ICartItem } from '../../models/cart';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/reducers/cart/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/reducers/cart/selectors';

const CheckoutItem = ({ cartItem }: {cartItem: ICartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const cartProducts = useSelector(selectCart);

  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartProducts, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartProducts, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartProducts, cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;