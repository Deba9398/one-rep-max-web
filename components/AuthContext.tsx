import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../util/firebase';
import { User, signInAnonymously } from 'firebase/auth';

export interface AuthContextType {
  currentUser: User | null;
  signInAnonymously: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signInAnonymously: async () => null,
});

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInAnonymously: async () => {
      const result = await signInAnonymously(auth);
      setCurrentUser(result.user);
      return result.user;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
