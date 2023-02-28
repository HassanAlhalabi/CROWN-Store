import { createSelector } from "reselect";
import { ICartItem } from "../../../models/cart";

export const getCartCount = (cartItems: ICartItem[]) => {
    const count = cartItems.reduce(
        (cartTotal: number, cartItem: ICartItem) => cartTotal + cartItem.quantity,
        0
    );
    return count;
}

export const getCartTotal = (cartItems: ICartItem[]) => {
    const newCartTotal = cartItems.reduce(
        (cartTotal: number, cartItem: ICartItem) => cartTotal + cartItem.quantity * cartItem.price,
        0
    );
    return newCartTotal;
}

const selectorRef = state => state.cart;

export const selectCart = createSelector(selectorRef, state => state.cartItems);

export const selectCartCount = createSelector(selectorRef, state => getCartCount(state.cartItems));

export const selectCartTotal = createSelector(selectorRef, state => getCartTotal(state.cartItems));