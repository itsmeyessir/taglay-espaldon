import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { StatsCardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { useDashboardStats } from "@/hooks/useDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();
  
  const isBuyer = user?.role === 'buyer';

  const chartData = stats?.chartData || [];
  const totalRevenue = stats?.totalRevenue || 0;
  const totalOrders = stats?.counts?.orders || 0;
  const totalProducts = stats?.counts?.products || 0;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
            {isBuyer ? "Procurement Analytics" : "Analytics"}
          </h1>
          <p className="text-stone-600">
            {isBuyer ? "Track your sourcing expenses and trends" : "Track your performance and insights"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl">
          <Calendar className="w-4 h-4 text-stone-500" strokeWidth={1.5} />
          <span className="text-sm text-stone-700">Last 6 months</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title={isBuyer ? "Total Spent" : "Total Revenue"}
            value={formatPrice(totalRevenue)}
            // change={{ value: 12, label: "vs last period" }} // To calculate this, we'd need prev month data
            icon={<DollarSign className="w-6 h-6" strokeWidth={1.5} />}
          />
          <StatsCard
            title="Total Orders"
            value={totalOrders}
            // change={{ value: 8, label: "vs last period" }}
            icon={<ShoppingCart className="w-6 h-6" strokeWidth={1.5} />}
          />
          <StatsCard
            title={isBuyer ? "Avg. Order Cost" : "Avg. Order Value"}
            value={formatPrice(avgOrderValue)}
            // change={{ value: 5, label: "vs last period" }}
            icon={<TrendingUp className="w-6 h-6" strokeWidth={1.5} />}
          />
          <StatsCard
            title={isBuyer ? "Unique Products" : "Active Products"}
            value={totalProducts}
            // change={{ value: 2, label: "new this month" }}
            icon={<Package className="w-6 h-6" strokeWidth={1.5} />}
          />
        </div>
      )}

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue/Spending Chart */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-stone-900">
                {isBuyer ? "Spending History" : "Revenue Overview"}
              </h3>
              <p className="text-sm text-stone-500">
                {isBuyer ? "Monthly procurement costs" : "Monthly revenue trend"}
              </p>
            </div>
            <BarChart3 className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
          </div>

          {isLoading ? (
            <ChartSkeleton height="h-48" />
          ) : (
            <div className="flex items-end justify-between h-48 gap-4">
              {chartData.map((data, index) => {
                const maxRevenue = Math.max(...chartData.map((d) => d.revenue));
                const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full bg-forest-500 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                    <span className="text-xs text-stone-500">{data.month}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-stone-900">Orders Trend</h3>
              <p className="text-sm text-stone-500">Monthly order count</p>
            </div>
            <PieChart className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
          </div>

          {isLoading ? (
            <ChartSkeleton height="h-48" />
          ) : (
            <div className="flex items-end justify-between h-48 gap-4">
              {chartData.map((data, index) => {
                const maxOrders = Math.max(...chartData.map((d) => d.orders));
                const height = maxOrders > 0 ? (data.orders / maxOrders) * 100 : 0;
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full bg-clay-400 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                    <span className="text-xs text-stone-500">{data.month}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}