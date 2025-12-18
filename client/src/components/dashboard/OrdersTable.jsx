import { cn } from "@/lib/utils";
import { formatPrice, formatDate } from "@/lib/utils";
import Badge from "../ui/Badge";
import { FileDown, MoreVertical, MapPin, Calendar, Truck } from "lucide-react";

export default function OrdersTable({ orders, className }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "in-transit":
        return "transit";
      case "processing":
        return "pending";
      case "pending":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "in-transit":
        return "In Transit";
      case "processing":
        return "Processing";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className={cn("bg-white rounded-2xl border border-stone-200 overflow-hidden", className)}>
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-semibold text-lg text-stone-900">Order Tracking</h3>
          <p className="text-sm text-stone-500">Monitor your sourcing orders</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-500/20">
            <option>All Status</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Processing</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Logistics Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-stone-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-stone-50/50 transition-colors">
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" strokeWidth={1.5} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 truncate max-w-[200px]">
                        {order.items[0]?.title}
                        {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                      </p>
                      <p className="text-xs text-stone-500">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} units • {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                  </td>

                  {/* Logistics Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
                      <span className="text-sm text-stone-700 capitalize">
                        {order.status === 'pending' ? 'Processing' : order.status === 'confirmed' ? 'Ready for pickup' : order.status}
                      </span>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-xs text-stone-500">From Farmers</p>
                        <p className="text-xs text-stone-900">→ {order.shippingAddress?.city || 'N/A'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </td>

                  {/* Invoice */}
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-forest-700 bg-forest-50 rounded-lg hover:bg-forest-100 transition-colors">
                      <FileDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Download
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
        <p className="text-sm text-stone-500">
          Showing <span className="font-medium text-stone-900">1-{orders.length}</span> of{" "}
          <span className="font-medium text-stone-900">{orders.length}</span> orders
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
