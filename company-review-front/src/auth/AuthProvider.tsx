import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./useAuth";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tokens, setTokens] = useState<{ idToken: string | null; accessToken: string | null; refreshToken: string | null }>({ idToken: null, accessToken: null, refreshToken: null });
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (idToken && accessToken) {
      setTokens({ idToken, accessToken, refreshToken });
    }
  }, []);

  const login = () => {
    const domain = import.meta.env.VITE_AWS_COGNITO_DOMAIN;
    const clientId = import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SIGNIN_REDIRECT_URL;

    const returnPath = window.location.pathname;
    sessionStorage.setItem("redirectAfterLogin", returnPath);

    window.location.href = `${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+profile`;
  };

  const logout = () => {
    const domain = import.meta.env.VITE_AWS_COGNITO_DOMAIN;
    localStorage.clear();
    window.location.href = `${domain}/logout?logout_uri=${import.meta.env.VITE_SIGNOUT_REDIRECT_URL}`;
  };

  return <AuthContext.Provider value={{ ...tokens, login, logout }}>{children}</AuthContext.Provider>;
};