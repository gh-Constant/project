import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '../types';
import { db } from '../utils/database';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (username: string, pin: string) => void;
  register: (username: string, pin: string, category: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBanned: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const checkBanStatus = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        
        if (db.isIpBanned(ip)) {
          setIsBanned(true);
          return;
        }

        const username = Cookies.get('username');
        if (username && db.isUserBanned(username)) {
          setIsBanned(true);
          return;
        }

        const pin = Cookies.get('pin');
        if (username && pin) {
          const user = db.getUser(username, pin);
          if (user) {
            user.ip = ip;
            setUser(user);
          }
        }
      } catch (error) {
        console.error('Error checking ban status:', error);
      }
    };

    checkBanStatus();
  }, []);

  const login = async (username: string, pin: string) => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip;

      if (db.isIpBanned(ip)) {
        setIsBanned(true);
        return;
      }

      if (db.isUserBanned(username)) {
        setIsBanned(true);
        return;
      }

      const user = db.getUser(username, pin);
      if (user) {
        user.ip = ip;
        Cookies.set('username', username, { expires: 7 });
        Cookies.set('pin', pin, { expires: 7 });
        setUser(user);
        toast.success('Connexion réussie!');
      } else {
        toast.error('Identifiants invalides');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Erreur lors de la connexion');
    }
  };

  const register = async (username: string, pin: string, category: string) => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip;

      if (db.isIpBanned(ip)) {
        setIsBanned(true);
        return;
      }

      const user = { username, pin, category, ip, role: 'user' as const };
      db.saveUser(user);
      login(username, pin);
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Erreur lors de l\'inscription');
    }
  };

  const logout = () => {
    Cookies.remove('username');
    Cookies.remove('pin');
    setUser(null);
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isBanned 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}