import { createContext, useContext, useState } from 'react';

import * as db from '../Database';

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  lastActivity: string;
  totalActivity: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (userData: User) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Users data from users.json
  const users: User[] = db.users;

  const signIn = async (username: string, password: string): Promise<boolean> => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const signUp = async (userData: User): Promise<boolean> => {
    users.push(userData);
    setUser(userData);
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
