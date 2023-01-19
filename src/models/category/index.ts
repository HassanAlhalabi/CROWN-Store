import { Product } from "../products"

export type CategoryTitle = "hats" | 'jackets' | 'mens' | 'sneakers' | 'womens';

export type CategoryMap = {
    
}

export interface ICategory {
    id: string | number,
    title: string,
    imageUrl: string
}

