import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrdersTable from "@/components/dashboard/OrdersTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboard";
import PageLoader from "@/components/PageLoader";
import {
  ShoppingCart,
  Package,
  Truck,
  DollarSign,
  Users,
  Store,
  CheckCircle
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isFarmer = user?.role === 'farmer';
  const isBuyer = user?.role === 'buyer';

  // Fetch data for all roles (now unified)
  const { 
    data: statsData, 
    isLoading 
  } = useDashboardStats({ enabled: !!user });

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  // Prepare data for display
  let stats = [];
  let tableData = [];

  if (statsData) {
    if (isAdmin) {
      stats = [
        {
          title: "Total Users",
          value: statsData.counts.users,
          icon: <Users className="w-6 h-6" />,
          change: { value: 0, label: "total registered" }
        },
        {
          title: "Total Orders",
          value: statsData.counts.orders,
          icon: <ShoppingCart className="w-6 h-6" />,
          change: { value: 0, label: "all time" }
        },
        {
          title: "Total Products",
          value: statsData.counts.products,
          icon: <Store className="w-6 h-6" />,
          change: { value: 0, label: "active listings" }
        },
        {
          title: "Total Revenue",
          value: formatPrice(statsData.totalRevenue),
          icon: <DollarSign className="w-6 h-6" />,
          change: { value: 0, label: "gross volume" }
        },
      ];
    } else if (isFarmer) {
      // Farmer Stats (Sales)
      stats = [
        {
          title: "Total Sales",
          value: statsData.counts.orders,
          icon: <ShoppingCart className="w-6 h-6" />,
          change: { value: 0, label: "orders received" }
        },
        {
          title: "My Products",
          value: statsData.counts.products,
          icon: <Package className="w-6 h-6" />,
          change: { value: 0, label: "active listings" }
        },
        {
          title: "Completed",
          value: statsData.counts.orders, // Placeholder until we have refined status counts
          icon: <CheckCircle className="w-6 h-6" />,
          change: { value: 0, label: "delivered/pending" }
        },
        {
          title: "Total Revenue",
          value: formatPrice(statsData.totalRevenue),
          icon: <DollarSign className="w-6 h-6" />,
          change: { value: 0, label: "gross sales" }
        },
      ];
    } else if (isBuyer) {
      // Buyer Stats (Purchases)
      stats = [
        {
          title: "Total Orders",
          value: statsData.counts.orders,
          icon: <ShoppingCart className="w-6 h-6" />,
          change: { value: 0, label: "orders placed" }
        },
        {
          title: "Total Spent",
          value: formatPrice(statsData.totalRevenue), // Reuse totalRevenue field for spending
          icon: <DollarSign className="w-6 h-6" />,
          change: { value: 0, label: "total expenses" }
        },
        {
          title: "Products Bought",
          value: statsData.counts.products, // "Unique products bought"
          icon: <Package className="w-6 h-6" />,
          change: { value: 0, label: "unique items" }
        },
        {
          title: "Active Orders",
          // Calculate active orders from recentOrders if possible, or request specific count
          // For now, let's use a placeholder or derived from available data
           value: statsData.recentOrders?.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length || 0,
          icon: <Truck className="w-6 h-6" />,
          change: { value: 0, label: "in progress" }
        },
      ];
    }
    tableData = statsData.recentOrders || [];
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          {isAdmin ? "Admin Overview" : (isFarmer ? "Farmer Dashboard" : "Procurement Dashboard")}
        </h1>
        <p className="text-stone-600">
          {isAdmin 
            ? "Platform-wide statistics and recent activity" 
            : (isFarmer ? "Track your orders and manage your sourcing operations" : "Manage your sourcing, orders, and expenses")}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <h2 className="text-lg font-serif font-bold text-stone-900">
            {isAdmin ? "Recent Orders" : (isFarmer ? "Recent Sales" : "My Orders")}
          </h2>
        </div>
        <OrdersTable orders={tableData} />
      </div>
    </DashboardLayout>
  );
}
