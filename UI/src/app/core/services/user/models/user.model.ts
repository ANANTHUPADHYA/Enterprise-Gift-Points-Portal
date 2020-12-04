export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  yoyoPoints: string;
  admin: boolean;
}

export interface UserDataResponse {
  success: boolean;
  data?: UserData;
  error?: string;
}

export interface CartResponse {
  success: boolean;
  data?: number;
  error?: string;
}
