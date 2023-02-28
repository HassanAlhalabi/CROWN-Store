import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item';
import { ICartItem } from '../../models/cart';
import { selectCart, selectCartTotal } from '../../store/reducers/cart/selectors';

import './style.scss';

const Checkout = () => {

  const cartItems = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems?.map((cartItem: ICartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;