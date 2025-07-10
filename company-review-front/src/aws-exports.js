export const awsConfig = {
    Auth: {
        region: import.meta.env.VITE_AWS_REGION,
        userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
    }
};
console.log("AWS Config:", awsConfig.Auth);