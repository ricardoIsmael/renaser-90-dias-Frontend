export interface SignInCredentials {
  email: string;
  password: string;
}

export interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  submitting: boolean;
  errorMsg: string | null;
}
