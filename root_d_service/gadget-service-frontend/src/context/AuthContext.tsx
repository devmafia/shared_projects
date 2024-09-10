// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import axios from 'axios';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     // Check if token is present and valid on initial load
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       axios.get('http://localhost:5000/api/auth/validate-token', { headers: { Authorization: `Bearer ${token}` } })
//         .then(response => setIsAuthenticated(true))
//         .catch(() => setIsAuthenticated(false));
//     }
//   }, []);

//   const login = (email: string, password: string) => {
//     axios.post('http://localhost:5000/api/auth/login', { email, password })
//       .then(response => {
//         localStorage.setItem('authToken', response.data.token); // Save token
//         setIsAuthenticated(true);
//       })
//       .catch(error => console.error('Login failed:', error));
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken'); // Remove token
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
  
      if (!isTokenExpired && !isAuthenticated) {
        setIsAuthenticated(true);
      } else if (isTokenExpired && isAuthenticated) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  const login = (email: string, password: string) => {
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        if (!isAuthenticated) {  // Only set state if it's not already authenticated
          setIsAuthenticated(true);
        }
      })
      .catch(error => console.error('Login failed:', error));
  };
  

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

