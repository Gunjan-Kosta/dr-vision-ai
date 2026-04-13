import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('dr_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Mock login
    const doctor = { name: 'Dr. Sarah Wilson', email, role: 'Ophthalmologist' };
    setUser(doctor);
    localStorage.setItem('dr_user', JSON.stringify(doctor));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dr_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
