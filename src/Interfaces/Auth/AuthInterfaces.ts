export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface UserState {
    userData: UserData | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    groups: string[];
    is_active: boolean;
    token?: string;
  }
  
  export interface ErrorResponse {
    message: string;
  }
  