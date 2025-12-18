import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { OrdersTableSkeleton } from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useMyOrders, useFarmerOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-amber-100 text-amber-700" },
  processing: { label: "Processing", icon: Loader2, color: "bg-blue-100 text-blue-700" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "bg-blue-100 text-blue-700" },
  "in-transit": { label: "In Transit", icon: Truck, color: "bg-purple-100 text-purple-700" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-700" }, // backend uses shipped, mapped to in-transit UI concept
  delivered: { label: "Delivered", icon: Package, color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-700" },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const isFarmer = user?.role === 'farmer';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch data based on role
  const { 
    data: buyerOrders, 
    isLoading: loadingBuyer 
  } = useMyOrders({ enabled: !isFarmer });

  const { 
    data: farmerOrders, 
    isLoading: loadingFarmer 
  } = useFarmerOrders({ enabled: isFarmer });

  const { mutate: updateStatus } = useUpdateOrderStatus();

  const isLoading = isFarmer ? loadingFarmer : loadingBuyer;
  const orders = (isFarmer ? farmerOrders : buyerOrders) || [];

  const filteredOrders = orders.filter((order) => {
    // Basic search filtering
    const searchString = searchQuery.toLowerCase();
    const matchesSearch =
      order._id.toLowerCase().includes(searchString) ||
      order.items.some(item => item.title.toLowerCase().includes(searchString));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateStatus({ id: orderId, status: newStatus });
  };

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
            {isFarmer ? "Incoming Orders" : "My Orders"}
          </h1>
              <p className="text-stone-600">
                {isFarmer ? "Manage shipments and track fulfillment" : "Track your purchases"}
              </p>
            </div>
            <Button variant="secondary">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Export
            </Button>
          </motion.div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/60 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden">
            {isLoading ? (
              <OrdersTableSkeleton rows={6} />
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Order ID</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Product</th>
                    {isFarmer && <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Customer</th>}
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Quantity</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Amount</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-stone-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <tr key={order._id} className="border-b border-stone-100 hover:bg-stone-50/50">
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm text-stone-900">{order._id.substring(0, 8)}...</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-stone-900 block max-w-[200px] truncate">
                            {order.items.map(i => i.title).join(", ")}
                          </span>
                        </td>
                        {isFarmer && (
                          <td className="py-4 px-6">
                            <span className="text-stone-600">{order.buyerId?.name || "Unknown"}</span>
                          </td>
                        )}
                        <td className="py-4 px-6">
                          <span className="text-stone-600">
                            {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {isFarmer ? (
                            <select 
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-forest-500 cursor-pointer ${status.color}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              <StatusIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                              {status.label}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-stone-900">{formatPrice(order.totalPrice)}</span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-stone-400 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            )}

            {/* Pagination (Simplified) */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100">
              <p className="text-sm text-stone-500">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
              {/* Pagination controls would go here */}
            </div>
          </div>

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
              <motion.div
                className="bg-white rounded-2xl max-w-lg w-full p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 text-stone-400 hover:text-stone-600"
                  >
                    <XCircle className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Order ID</span>
                    <span className="font-mono text-stone-900">{selectedOrder._id}</span>
                  </div>
                  {/* List Items */}
                  <div className="py-2 border-b border-stone-100">
                    <span className="text-stone-500 block mb-2">Items</span>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm mb-1">
                        <span>{item.title} (x{item.quantity})</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Date</span>
                    <span className="text-stone-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Total Amount</span>
                    <span className="font-bold text-forest-800">{formatPrice(selectedOrder.totalPrice)}</span>
                  </div>
                  <div className="py-2">
                    <span className="text-stone-500 block mb-1">Shipping Address</span>
                    <p className="text-stone-900 text-sm">
                      {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1" variant="secondary" onClick={() => setSelectedOrder(null)}>Close</Button>
                </div>
              </motion.div>
            </div>
          )}
    </DashboardLayout>
  );
}
