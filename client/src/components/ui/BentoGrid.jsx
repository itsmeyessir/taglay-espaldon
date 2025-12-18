import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}) {
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-xl transition-all duration-300",
        "p-5 bg-white border border-stone-200/60",
        "hover:border-stone-300 dark:hover:border-stone-600",
        "justify-between flex flex-col space-y-4",
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition-transform duration-300">
        {icon}
        <div className="font-serif font-semibold text-stone-900 mb-2 mt-2">
          {title}
        </div>
        <div className="text-sm text-stone-500">{description}</div>
      </div>
    </motion.div>
  );
}
