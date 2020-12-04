
export interface Category {
  _id: string;
  name: string;
}

export interface Products {
  name: string;
  category: Category;
  rating?: number;
  price: number;
  discount?: number;
  _id?: string;
  description: string;
  quantity?: number;
  filename?: string;
  file?: string;
  image?: string;
}

export interface ProductsAPIResponse {
  success: boolean;
  data?: Products[];
  error?: string;
}

export interface AddToCart {
  success: boolean;
  data?: string;
  error?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data?: Category[];
  error?: string;
}


