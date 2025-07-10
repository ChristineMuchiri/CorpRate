export const awsConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
  },
  oauth: {
    domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN,
    scope: ['openid', 'email', 'profile'],
    redirectSignIn: import.meta.env.VITE_SIGNIN_REDIRECT_URL,
    redirectSignOut: import.meta.env.VITE_SIGNOUT_REDIRECT_URL,
    responseType: 'code', // or 'token'
  }
};
console.log('Resolved Amplify Config:', awsConfig);
