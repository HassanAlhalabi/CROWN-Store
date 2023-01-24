import { createContext, useEffect, ReactNode, useReducer } from 'react';
import { ICart, ICartItem } from '../../models/cart';
import { Product } from '../../models/products';
import { createAction } from '../../utils';

export interface ICartContext {
  cartItems: ICartItem[] | [],
  addItemToCart: (product: Product) => void,
  removeItemFromCart: (cartItemToRemove: ICartItem) => void,
  clearItemFromCart: (cartItemToClear: ICartItem) => void,
  cartCount: number,
  cartTotal: number,
}

const CART_INITIAL_STATE : ICart = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

export const addCartItem = (cartItems: ICartItem[], productToAdd: Product): ICartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: ICartItem[], cartItemToRemove: ICartItem) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: ICartItem[], cartItemToClear: ICartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addItemToCart: (product: Product) => {},
  removeItemFromCart: (cartItemToRemove: ICartItem) => {},
  clearItemFromCart: (cartItemToClear: ICartItem) => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  updateCart: 'UPDATE_CART',
  addToCart: 'ADD_TO_CART',
  removeFromCart: 'REMOVE_FROM_CART',
  clearCart: 'CLEAR_CART',
  setCartTotal: 'SET_CART_TOTAL',
  setCartCount: 'SET_CART_COUNT'
}

const cartReducer = (state: ICart, action: any) => {
  const {type, payload} = action;
  
  switch (type) {
    case CART_ACTION_TYPES.updateCart:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export const CartProvider = ({ children }: {children: ReactNode}) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const updateCartItems = (cartItems: ICartItem[]) => {
    const count = cartItems.reduce(
      (cartTotal: number, cartItem: ICartItem) => cartTotal + cartItem.quantity,
      0
    );
    const newCartTotal = cartItems.reduce(
      (cartTotal: number, cartItem: ICartItem) => cartTotal + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(createAction(CART_ACTION_TYPES.updateCart, 
      {
        cartItems,
        cartCount: count,
        cartTotal: newCartTotal
      }));
  }

  const removeItemFromCart = (cartItemToRemove: ICartItem) => 
    updateCartItems(removeCartItem(state.cartItems, cartItemToRemove));


  const clearItemFromCart = (cartItemToClear: ICartItem) =>
    updateCartItems(clearCartItem(state.cartItems, cartItemToClear));

  const addItemToCart = (product: Product) =>
    updateCartItems(addCartItem(state.cartItems, product) as ICartItem[])

  return    <CartContext.Provider value={{
                                        addItemToCart,
                                        removeItemFromCart,
                                        clearItemFromCart,
                                        cartCount: state.cartCount,
                                        cartTotal:  state.cartTotal,
                                        cartItems: state.cartItems
                                    }}>
                {children}
            </CartContext.Provider>;
};