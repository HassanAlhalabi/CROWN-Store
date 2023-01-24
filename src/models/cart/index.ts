import { Product } from '../products'

export interface ICartItem extends Product {
    quantity: number
}

export interface ICart {
    cartItems: [] | ICartItem[],
    cartCount: number,
    cartTotal: number
}
  