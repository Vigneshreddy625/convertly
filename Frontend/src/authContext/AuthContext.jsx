import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const API_URL = 'https://convertly-min2.onrender.com/auth';


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const refreshTimerRef = useRef(null);

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const scheduleTokenRefresh = useCallback((token) => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    
    if (!token) return;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresIn = payload.exp * 1000; 
      const currentTime = Date.now();
      const tokenLifetime = expiresIn - currentTime;
      
      if (tokenLifetime <= 0) {
        console.log('Token has already expired');
        return;
      }
      
      const refreshBuffer = Math.min(5 * 60 * 1000, tokenLifetime / 2);
      const timeUntilRefresh = Math.max(0, tokenLifetime - refreshBuffer);
      
      console.log(`Token will be refreshed in ${timeUntilRefresh / 1000} seconds`);
      
      refreshTimerRef.current = setTimeout(() => {
        console.log('Executing scheduled token refresh');
        refreshToken();
      }, timeUntilRefresh);
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    console.log('Attempting to refresh token...');
    try {
      const response = await api.post('/refresh');
      
      if (response.data.access_token) {
        console.log('Token refresh successful');
        setAccessToken(response.data.access_token);
        scheduleTokenRefresh(response.data.access_token);
        
        try {
          const userResponse = await api.get('/me');
          setUser(userResponse.data);
        } catch (userError) {
          console.error('Failed to fetch user data after token refresh:', userError);
        }
        
        return { success: true };
      } else {
        throw new Error('Invalid refresh response');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setUser(null);
      setAccessToken(null);
      return { success: false };
    }
  }, [scheduleTokenRefresh]);

  const fetchCurrentUser = useCallback(async () => {
    if (!accessToken) return { success: false };
    
    try {
      const response = await api.get('/me');
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Error fetching current user:', error);
      if (error.response?.status === 401) {
        const refreshResult = await refreshToken();
        if (!refreshResult.success) {
          setUser(null);
          setAccessToken(null);
        }
      }
      return { success: false };
    }
  }, [accessToken, refreshToken]);

  const register = async (userData) => {
    setRegisterLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/register', userData);
      setRegisterLoading(false);
      navigate('/login');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed';
      
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      setAuthError(errorMessage);
      setRegisterLoading(false);
      return { error: errorMessage };
    }
  };

  const login = async (credentials) => {
    setLoginLoading(true);
    setAuthError(null);
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      
      const response = await api.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      const token = response.data.access_token;
      setAccessToken(token);
      scheduleTokenRefresh(token);
      navigate('/home');
      
      // // Get user data with the new token
      // try {
      //   const userResponse = await api.get('/me');
      //   setUser(userResponse.data);
      //   console.log('Login successful:', userResponse.data);
      //   navigate('/home');
      // } catch (userError) {
      //   throw new Error('Failed to fetch user data after login');
      // }
      
      setLoginLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed';
      setAuthError(errorMessage);
      setLoginLoading(false);
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      setUser(null);
      setAccessToken(null);
      navigate('/');
    }
  };

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/refresh')
        ) {
          originalRequest._retry = true;

          try {
            const refreshResult = await refreshToken();
            if (refreshResult.success) {
              return api(originalRequest);
            }
          } catch (refreshError) {
            setUser(null);
            setAccessToken(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken]);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing authentication...');
      setLoading(true);
      
      if (accessToken) {
        try {
          const result = await fetchCurrentUser();
          if (!result.success) {
            const refreshResult = await refreshToken();
            if (!refreshResult.success) {
              setUser(null);
              setAccessToken(null);
            }
          }
        } catch (error) {
          console.error('Error initializing authentication:', error);
          setUser(null);
          setAccessToken(null);
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [fetchCurrentUser, refreshToken]);

  const value = {
    user,
    accessToken,
    loading,
    loginLoading,
    registerLoading,
    authError,
    register,
    login,
    logout,
    refreshToken,
    isAuthenticated: !!user,
    api
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user, loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/login');
      }
    }, [loading, isAuthenticated, navigate]);

    if (loading) {
      return <p >Loading...</p>;
    }

    if (!isAuthenticated) {
      return null; 
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export const withAdminAuth = (Component) => {
  const AdminComponent = (props) => {
    const { user, loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          navigate('/login');
        } else if (user?.role !== "admin") {
          navigate('/access-denied');
        }
      }
    }, [loading, isAuthenticated, user, navigate]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!isAuthenticated || user?.role !== "admin") {
      return null; // The useEffect will redirect
    }

    return <Component {...props} />;
  };

  return AdminComponent;
};