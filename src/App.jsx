import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import Prescription from './pages/Prescription';
import Preview from './pages/Preview';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PredictionProvider } from './context/PredictionContext';
import { ThemeProvider } from './context/ThemeContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PredictionProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/result" element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              } />
              <Route path="/prescription" element={
                <ProtectedRoute>
                  <Prescription />
                </ProtectedRoute>
              } />
              <Route path="/preview" element={
                <ProtectedRoute>
                  <Preview />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </PredictionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
