// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'http://127.0.0.1:8000/auth';

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      
      if (response.ok) {
        await login({
          username: userData.username,
          password: userData.password
        });
      } else {
        console.error('Registration failed:', data.detail || 'Something went wrong');
        return { error: data.detail || 'Registration failed' };
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return { error: 'Network error during registration' };
    }
  };

  // Function to handle user login
  const login = async (credentials) => {
    try {
      // Create form data (OAuth2 format)
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        await fetchCurrentUser(); // Get user data with the new token
        navigate('/dashboard');
        return { success: true };
      } else {
        console.error('Login failed:', data.detail || 'Invalid credentials');
        return { error: data.detail || 'Login failed' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { error: 'Network error during login' };
    }
  };

  // Function to handle user logout
  const logout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Call logout endpoint
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    // Clear local state regardless of API response
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  // Function to fetch the current user
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setUser(data); // Our backend returns user object directly
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  // useEffect to fetch the current user on component mount
  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Provide the context values
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};