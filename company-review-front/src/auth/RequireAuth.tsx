import { useAuth } from "./useAuth";
import { useEffect } from "react";

import { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { idToken, login } = useAuth();

  useEffect(() => {
    if (!idToken) login();
  }, [idToken]);

  if (!idToken) return null;
  return children;
}
