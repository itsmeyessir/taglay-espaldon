import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // State to hold the user and loading status. Managed by react-query.
  // Use a custom state here if you need more immediate control/initialization
  // but for actual data, react-query is preferred.
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Use useQuery to fetch the current user on mount
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const response = await API.get('/auth/me');
        return response.data;
      } catch (err) {
        // If not authenticated, the /auth/me endpoint will return 401
        // We just return null and handle it.
        if (err.response && err.response.status === 401) {
            return null;
        }
        throw err; // Re-throw other errors
      }
    },
    retry: false, // Don't retry on 401, for instance
  });

  useEffect(() => {
    if (!isLoading) {
      setUser(data);
      setLoadingInitial(false);
    }
  }, [isLoading, data]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await API.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(['currentUser'], data); // Update query cache
      navigate('/dashboard'); // Navigate to dashboard on successful login
    },
    onError: (err) => {
      console.error('Login failed:', err.response?.data || err.message);
      // You might want to display a toast notification here
      throw err; // Re-throw to allow component to handle specific errors
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await API.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(['currentUser'], data); // Update query cache
      navigate('/dashboard'); // Navigate to dashboard on successful registration
    },
    onError: (err) => {
      console.error('Registration failed:', err.response?.data || err.message);
      throw err;
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await API.post('/auth/logout');
    },
    onSuccess: () => {
      setUser(null);
      queryClient.removeQueries('currentUser'); // Invalidate/remove user data from cache
      navigate('/login'); // Redirect to login page
    },
    onError: (err) => {
      console.error('Logout failed:', err.response?.data || err.message);
      throw err;
    },
  });

  const authContextValue = {
    user,
    isLoading: isLoading || loadingInitial, // Combine initial loading with query loading
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync, // Expose mutateAsync for Promise-based handling
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refetchUser: refetch, // Allow components to manually refetch user data
  };

  return (
    <AuthContext.Provider value={authContextValue}>
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
