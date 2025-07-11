// RequireAuth.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('idToken');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
