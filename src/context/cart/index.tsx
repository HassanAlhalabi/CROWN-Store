import { createContext, useState, useEffect, ReactNode } from 'react';
import { ICartItem } from '../../models/cart';
import { Product } from '../../models/products';

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

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: (product: Product) => {},
  removeItemFromCart: (cartItemToRemove: ICartItem) => {},
  clearItemFromCart: (cartItemToClear: ICartItem) => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }: {children: ReactNode}) => {

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeItemFromCart = (cartItemToRemove: ICartItem) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: ICartItem) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const addItemToCart = (product: Product) =>
    setCartItems(addCartItem(cartItems, product) as ICartItem[]);

  return    <CartContext.Provider value={{
                                        addItemToCart,
                                        removeItemFromCart,
                                        clearItemFromCart,
                                        cartCount,
                                        cartTotal,
                                        cartItems
                                    }}>
                {children}
            </CartContext.Provider>;
};