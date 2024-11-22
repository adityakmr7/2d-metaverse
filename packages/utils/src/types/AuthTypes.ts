// Define the types for authentication state and responses
export interface User {
  userId: string;
  username: string;
}
export enum UserType {
  admin = "admin",
  user = "user",
}

export interface SignInResponse {
  user: User;
  token: string;
}
export interface SignUpResponse {
  userId: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
export interface SignUpCredentials {
  email: string;
  password: string;
  type: UserType;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  userId: string | null;
  isAdmin: boolean;
}
