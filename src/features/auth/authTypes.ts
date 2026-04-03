export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: "brand" | "creator" | "admin";
  brand_name?: string;
  contact_person?: string;
  contact_person_number?: string;
  country_id: string;
  name: string;
  username: string;
  countryCode: string;
  otpCode: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      username: string;
      role: string;
    };
    access: string;
    refresh: string;
  };
}

export interface ErrorResponse {
  code?: number;
  message?: string;
}
