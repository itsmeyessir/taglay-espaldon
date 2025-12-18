import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-cream-50">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
