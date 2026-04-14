import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || 'Dr. ' + (currentUser.email.split('@')[0] || 'User'),
          role: 'Ophthalmologist'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    // Keep bypass functionality untouched for testing
    if (email === 'guest@example.com' && password === 'bypass') {
      const doctor = { name: 'Dr. Guest Bypass', email, role: 'Ophthalmologist' };
      setUser(doctor);
      return;
    }
    
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (user?.email === 'guest@example.com') {
      setUser(null);
      return;
    }
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
