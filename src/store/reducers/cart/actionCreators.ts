import { ICartItem } from "../../../models/cart";
import { Product } from "../../../models/products";
import { createAction } from "../../../utils";
import { CART_ACTION_TYPES } from "./actions";


export const removeItemFromCart = (cartItems: ICartItem[] ,cartItemToRemove: ICartItem) => {
    const newCart = cartItems.map((cartItem) =>
                        cartItem.id === cartItemToRemove.id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    );
    return createAction(CART_ACTION_TYPES.removeFromCart, newCart);
}

export const clearItemFromCart = (cartItems: ICartItem[] ,cartItemToClear: ICartItem) => {
    const newCart = cartItems.filter((item: ICartItem) => item.id !== cartItemToClear.id)
    return createAction(CART_ACTION_TYPES.clearCart, newCart);
}

export const addItemToCart = (cartItems: ICartItem[] ,product: Product) => {

    let newCart = [...cartItems];

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );

    if (existingCartItem) {

        newCart = [...cartItems.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )];
        return createAction(CART_ACTION_TYPES.addToCart, newCart );
    }
    
    newCart = [...cartItems, { ...product, quantity: 1 }]
    return createAction(CART_ACTION_TYPES.addToCart, newCart );
}