import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./useAuth";
import { jwtDecode } from "jwt-decode";


export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tokens, setTokens] = useState<{ idToken: string | null; accessToken: string | null; refreshToken: string | null }>({ idToken: null, accessToken: null, refreshToken: null });
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokens = async () => {
      const idToken = localStorage.getItem("idToken");
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!idToken || !accessToken) return;

      try {
        const decoded = jwtDecode(idToken);
        if (typeof decoded.exp === "number" && decoded.exp * 1000 < Date.now()) {
          if (refreshToken) {
            const newTokens = await tryRefresh(refreshToken);
            setTokens(newTokens);
            return;
          } else {
            logout();
            return;
          }
        }
        setTokens({ idToken, accessToken, refreshToken });
      } catch {
        logout();
      }
    };

    checkTokens();
  }, []);
  const tryRefresh = async (refreshToken: string) => {
    const domain = import.meta.env.VITE_AWS_COGNITO_DOMAIN;
    const clientId = import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID;

    const res = await fetch(`${domain}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: refreshToken,
      }),
    });
  
    const data = await res.json();
    if (data.id_token) {
      localStorage.setItem("idToken", data.id_token);
      localStorage.setItem("accessToken", data.access_token);
      return {
        idToken: data.id_token,
        accessToken: data.access_token,
        refreshToken,
      };
    } else {
      logout();
      return {
        idToken: null,
        accessToken: null,
        refreshToken: null,
      };
    }
  };
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
}