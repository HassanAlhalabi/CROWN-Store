import { Product } from '../products'

export interface ICartItem extends Product {
    quantity: number
}