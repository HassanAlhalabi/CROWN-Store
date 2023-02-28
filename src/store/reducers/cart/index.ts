import { ICart } from "../../../models/cart";
import { CART_ACTION_TYPES } from "./actions";

const CART_INITIAL_STATE : ICart = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const cartReducer = (state: ICart = CART_INITIAL_STATE, action: any) => {
    const {type, payload} = action;
    
    switch (type) {
      case CART_ACTION_TYPES.addToCart:
        return {
          ...state,
          cartItems: action.payload
        }
      case CART_ACTION_TYPES.removeFromCart:
        return {
          ...state,
          cartItems: action.payload
        }
      case CART_ACTION_TYPES.clearCart:
        return {
          ...state,
          cartItems: action.payload
        }
      case CART_ACTION_TYPES.setCartCount:
        return {
          ...state,
          cartCount: action.payload
        }
      case CART_ACTION_TYPES.setCartTotal:
        return {
          ...state,
          cartTotal: action.payload
        }
      default:
        return state
    }
  }