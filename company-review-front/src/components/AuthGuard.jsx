import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        getCurrentUser()
            .then(() => setAuthenticated(true))
            .catch(() => setAuthenticated(false))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
}
