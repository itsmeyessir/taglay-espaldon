import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../lib/axios';

// Fetch current user's orders
export const useMyOrders = (options = {}) => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await API.get('/orders/myorders');
      return response.data;
    },
    ...options,
  });
};

// Fetch orders for the logged-in farmer
export const useFarmerOrders = (options = {}) => {
  return useQuery({
    queryKey: ['farmerOrders'],
    queryFn: async () => {
      const response = await API.get('/orders/farmer');
      return response.data;
    },
    ...options,
  });
};

// Update order status (Farmer/Admin)
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await API.put(`/orders/${id}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myOrders']);
      queryClient.invalidateQueries(['farmerOrders']);
      queryClient.invalidateQueries(['dashboardStats']);
    },
  });
};

// Create a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      const response = await API.post('/orders', orderData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myOrders']);
    },
  });
};
