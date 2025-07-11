/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_USER_POOL_WEB_CLIENT_ID: string;
  readonly VITE_AWS_COGNITO_DOMAIN: string;
  readonly VITE_SIGNIN_REDIRECT_URL: string;
  // Add other variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
