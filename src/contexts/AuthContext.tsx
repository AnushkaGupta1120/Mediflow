
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('mediflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll accept any email with a password that's at least 6 chars
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      // Create a user based on the email
      const newUser: User = {
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'user',
        avatar: undefined
      };
      
      setUser(newUser);
      localStorage.setItem('mediflow_user', JSON.stringify(newUser));
      toast.success("Login successful");
      navigate('/');
    } catch (error) {
      toast.error("Invalid credentials");
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      const newUser: User = {
        name,
        email,
        role: email.includes('admin') ? 'admin' : 'user'
      };
      
      setUser(newUser);
      localStorage.setItem('mediflow_user', JSON.stringify(newUser));
      toast.success("Account created successfully");
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account");
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('mediflow_user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
