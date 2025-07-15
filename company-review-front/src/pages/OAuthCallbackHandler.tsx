import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackHandler() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (code) fetchTokens(code);
  }, []);

  const fetchTokens = async (code: string) => {
    const clientId = import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SIGNIN_REDIRECT_URL;
    const domain = import.meta.env.VITE_AWS_COGNITO_DOMAIN;

    const res = await fetch(`${domain}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await res.json();
    if (data.id_token) {
      localStorage.setItem("idToken", data.id_token);
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/landing-page";
      navigate(redirectTo);
    } else {
      navigate("/landing-page?authError=true");
    }
  };
    return (
    <div className="authentication">
      <p className="signing-in">
      Signing in...
      </p>
    </div>
);
  
}
