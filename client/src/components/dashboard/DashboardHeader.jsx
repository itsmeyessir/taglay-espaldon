import { Search, Bell, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search orders, products..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Notifications */}
          <button className="relative p-2.5 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-clay-500 rounded-full" />
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-stone-100 rounded-xl transition-colors">
            <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-forest-700" strokeWidth={1.5} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-stone-900">{user?.name || 'User'}</p>
              <p className="text-xs text-stone-500 capitalize">{user?.role || 'Account'}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
