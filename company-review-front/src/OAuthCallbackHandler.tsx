import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function OAuthCallbackHandler() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');
    if (code) {
        fetchTokkens(code)
    } else {
        navigate('/landing-page');
    }
}, []);

    const fetchTokkens = async (code: string) => {
        const clientId = import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_SIGNIN_REDIRECT_URL;

        const response = await fetch(`${import.meta.env.VITE_AWS_COGNITO_DOMAIN}/oauth2/token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    code: code,
                    redirect_uri: redirectUri,
                }),
            }
        );
        const data = await response.json();
        if (data.id_token) {
            localStorage.setItem('idToken', data.id_token);
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            navigate('/companies'); // Redirect to home or desired page after successful login
        } else {
            console.error("Token exchange failed", data);
        }
};
return <p>Signing In...</p>;
}