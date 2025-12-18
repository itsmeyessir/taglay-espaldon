import { motion } from "framer-motion";
import { useMotion, pageTransition } from "@/contexts/MotionContext";

/**
 * PageWrapper - Wraps pages with smooth enter/exit transitions
 * Uses GPU-accelerated transforms and respects reduced motion preference
 */
export default function PageWrapper({ children, className = "" }) {
  const { reducedMotion } = useMotion();
  const variants = pageTransition(reducedMotion);

  return (
    <motion.div
      className={`will-change-transform ${className}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
      style={{ 
        // Force GPU acceleration
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
}
