import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Store,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Sourcing", icon: Store, href: "/dashboard/sourcing" }, // New for Buyers
  { name: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { name: "Products", icon: Package, href: "/dashboard/products" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
];

const bottomItems = [
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  { name: "Help", icon: HelpCircle, href: "/dashboard/help" },
];

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const { logout, user } = useAuth(); // Get user from auth context
  const location = useLocation();

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter(item => {
    if (item.name === "Products") {
      // Only show Products to farmers and admins
      return user?.role === 'farmer' || user?.role === 'admin';
    }
    if (item.name === "Sourcing") {
      // Only show Sourcing to buyers
      return user?.role === 'buyer';
    }
    // Show Analytics, Overview, Orders to everyone
    return true; 
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-forest-950 text-white flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-forest-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
            <span className="text-forest-900 font-serif font-bold text-xl">T</span>
          </div>
          {!collapsed && (
            <span className="font-serif font-bold text-xl">Taglay</span>
          )}
        </Link>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                isActive
                  ? "bg-forest-800 text-white"
                  : "text-forest-300 hover:bg-forest-800/50 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-forest-800 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest-300 hover:bg-forest-800/50 hover:text-white transition-all"
          >
            <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            {!collapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}

        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-clay-400 hover:bg-clay-900/20 hover:text-clay-300 transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          {!collapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-forest-800 border border-forest-700 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        )}
      </button>
    </aside>
  );
}
