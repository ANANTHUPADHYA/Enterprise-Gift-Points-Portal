import { Products } from '../../products/models/products.model';

export  interface LoginResponse {
  success: boolean;
  data : {
    accessToken: string;
    profile: {
      uuid: string;
      email: string;
      firstName: string;
      lastName: string;
      yoyoPoints: number;
      admin: string;
  }
  }
  status?: string;
  error?: string;
}
export interface RegisterResponse {
  success: boolean;
  data?: string;
  
  
}

export interface RegisterParams {
  admin: string;
  firstName: string;
  lastName: string;
  yoyoPoints: string;
}




