import * as React from "react";

interface AuthFunctions {
  signIn: (data: { userToken: string }) => void;
  signOut: () => void;
  signUp: (data: { userToken: string }) => void;
}

const AuthContext = React.createContext<AuthFunctions>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signUp: () => {},
});

export default AuthContext;
