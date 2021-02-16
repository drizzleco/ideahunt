import * as React from "react";

interface AuthFunctions {
  signIn: (data: { userToken: string }) => void;
  signOut: () => void;
  signUp: (data: { userToken: string }) => void;
}

const AuthContext = React.createContext<AuthFunctions>({
  signIn: (data) => {},
  signOut: () => {},
  signUp: (data) => {},
});

export default AuthContext;
