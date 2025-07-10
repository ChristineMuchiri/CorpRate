import React from "react";
import { Navigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

export default function AuthGuard({ children }) {
    return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <button onClick={signOut} className="sign-out-button">Sign Out</button>
          {children}
        </>
      )}
    </Authenticator>
  );
}
