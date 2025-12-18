import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../lib/axios';

// Fetch all products with optional filters
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      // Clean filters to remove undefined/null values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null)
      );
      const params = new URLSearchParams(cleanFilters).toString();
      const response = await API.get(`/products?${params}`);
      return response.data;
    },
    keepPreviousData: true, // Useful for pagination
  });
};

// Fetch a single product by ID
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await API.get(`/products/${productId}`);
      return response.data;
    },
    enabled: !!productId, // Only fetch if productId exists
  });
};

// Fetch logged-in farmer's products
export const useMyProducts = () => {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: async () => {
      const response = await API.get('/products/myproducts');
      return response.data;
    },
  });
};

// Create a new product (for Farmers)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProductData) => {
      const response = await API.post('/products', newProductData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']); // Refresh product list
    },
  });
};

// Update a product (for Farmers)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }) => {
      const response = await API.put(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['product', data._id]);
    },
  });
};

// Delete a product (for Farmers)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      await API.delete(`/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};
