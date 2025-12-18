import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Skeleton base component
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-stone-200/70",
        className
      )}
      {...props}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/3 rounded-none" />
      
      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>

        {/* Farmer Info */}
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-3 w-1/3 mb-4" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-3 border-t border-stone-100">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>

        {/* Min Order */}
        <Skeleton className="h-3 w-28 mt-2" />
      </div>
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 6 }) {
  return (
    <tr className="border-b border-stone-100">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton 
            className={cn(
              "h-4",
              i === 0 ? "w-20" : i === columns - 1 ? "w-16" : "w-24"
            )} 
          />
        </td>
      ))}
    </tr>
  );
}

// Orders Table Skeleton
export function OrdersTableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-100">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50">
              {["Order ID", "Product", "Cooperative", "Quantity", "Status", "Amount"].map((header) => (
                <th key={header} className="py-3 px-4 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <TableRowSkeleton key={i} columns={6} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/60">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

// Dashboard Grid Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Orders Table */}
      <OrdersTableSkeleton rows={5} />
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 6, columns = 3 }) {
  const gridClass = columns === 4 
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "grid md:grid-cols-2 lg:grid-cols-3 gap-6";
  
  return (
    <div className={gridClass}>
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Sidebar Menu Skeleton
export function SidebarSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

// Profile Card Skeleton
export function ProfileCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-5 w-32 mb-1" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

// Chart Skeleton
export function ChartSkeleton({ height = "h-64" }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/60">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <Skeleton className={cn(height, "w-full rounded-xl")} />
    </div>
  );
}

// List Item Skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  );
}

export default Skeleton;
