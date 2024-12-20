import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleBasedRoute } from '../utils/roleUtils';

export const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: 'authToken',
  USER: 'user'
};

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
    loading: true,
    error: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        
        if (mounted) {
          if (storedToken && storedUser) {
            const user = JSON.parse(storedUser);
            setState(prev => ({
              ...prev,
              token: storedToken,
              user,
              loading: false
            }));
            // Redirect to appropriate dashboard if user is already logged in
            navigate(getRoleBasedRoute(user.registrationType, user.operatorType));
          } else {
            setState(prev => ({ ...prev, loading: false }));
          }
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        if (mounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to restore authentication state'
          }));
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const login = useCallback(async (userData, authToken) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      
      setState(prev => ({
        ...prev,
        user: userData,
        token: authToken,
        error: null
      }));

      // Get the correct route based on user role and operator type
      const redirectPath = getRoleBasedRoute(
        userData.registrationType,
        userData.operatorType
      );
      navigate(redirectPath);
    } catch (error) {
      console.error('Error during login:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to complete login process'
      }));
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    
    setState({
      user: null,
      token: null,
      loading: false,
      error: null
    });
    
    navigate('/login');
  }, [navigate]);

  const value = useMemo(() => ({
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    logout
  }), [state, login, logout]);

  if (state.loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}