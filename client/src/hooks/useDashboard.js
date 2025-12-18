import { useQuery } from '@tanstack/react-query';
import API from '../lib/axios';

// Fetch dashboard stats (Admin/Farmer view)
export const useDashboardStats = (options = {}) => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await API.get('/dashboard/stats');
      return response.data;
    },
    // Only fetch if we are authorized (handled by component or global error handler, 
    // but good to have retry logic here)
    retry: 1, 
    ...options, // Spread passed options (like enabled)
  });
};
