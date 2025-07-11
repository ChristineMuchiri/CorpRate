// useAuth.ts
import { createContext, useContext } from "react";

export interface AuthContextType {
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  idToken: null,
  accessToken: null,
  refreshToken: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
