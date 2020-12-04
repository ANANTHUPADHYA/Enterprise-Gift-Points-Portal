import { Products } from 'src/app/core';
export interface AddToCartResponse {
  success: boolean;
  data?: string;
  error?: string;
};

export interface CartProduct {
  quantity: number;
  product: Products;
}
export interface CartDataResponse {
success: boolean;
data?: {
  email: string;
  products: CartProduct[];
};
error?: string;
}
