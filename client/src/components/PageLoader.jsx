import { motion } from "framer-motion";

/**
 * PageLoader - Full-page loading skeleton shown during lazy loading
 * Matches our design system with minimal animations for performance
 */
export default function PageLoader() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Logo placeholder */}
        <motion.div
          className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-forest-700 font-serif font-bold text-2xl">T</span>
        </motion.div>
        
        {/* Loading bar */}
        <div className="w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-forest-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "50%" }}
          />
        </div>
        
        <p className="text-stone-500 text-sm mt-4">Loading...</p>
      </motion.div>
    </div>
  );
}

/**
 * SectionLoader - Inline skeleton for sections/components
 */
export function SectionLoader({ height = "h-64", className = "" }) {
  return (
    <div className={`${height} ${className} bg-stone-100 rounded-2xl animate-pulse`} />
  );
}

/**
 * CardSkeleton - Skeleton for product/content cards
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-stone-200/50 border border-stone-100 animate-pulse">
      <div className="aspect-[4/3] bg-stone-100 rounded-xl mb-4" />
      <div className="h-4 bg-stone-100 rounded-full w-3/4 mb-2" />
      <div className="h-3 bg-stone-100 rounded-full w-1/2 mb-4" />
      <div className="h-8 bg-stone-100 rounded-lg w-1/3" />
    </div>
  );
}

/**
 * TextSkeleton - Skeleton for text content
 */
export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-stone-100 rounded-full"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}
