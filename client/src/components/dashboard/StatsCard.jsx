import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatsCard({
  title,
  value,
  change,
  icon,
  className,
}) {
  const getTrendIcon = () => {
    if (!change) return null;
    if (change.value > 0) return <TrendingUp className="w-4 h-4" strokeWidth={1.5} />;
    if (change.value < 0) return <TrendingDown className="w-4 h-4" strokeWidth={1.5} />;
    return <Minus className="w-4 h-4" strokeWidth={1.5} />;
  };

  const getTrendColor = () => {
    if (!change) return "text-stone-500";
    if (change.value > 0) return "text-forest-600";
    if (change.value < 0) return "text-red-600";
    return "text-stone-500";
  };

  return (
    <motion.div
      className={cn(
        "bg-white rounded-2xl border border-stone-200/60 p-6",
        "hover:shadow-lg hover:border-stone-300 transition-all duration-300",
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-forest-50 rounded-xl text-forest-600">
          {icon}
        </div>
        {change && (
          <div className={cn("flex items-center gap-1 text-sm", getTrendColor())}>
            {getTrendIcon()}
            <span className="font-medium">{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-stone-500 mb-1">{title}</p>
        <p className="text-3xl font-serif font-bold text-stone-900">{value}</p>
        {change && (
          <p className="text-xs text-stone-400 mt-1">{change.label}</p>
        )}
      </div>
    </motion.div>
  );
}
