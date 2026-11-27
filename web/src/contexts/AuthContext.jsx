// Estado global de autenticación. En la fase 2 se añaden login/logout/register y persistencia del token.
import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser, isAuthenticated: Boolean(user) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
