import { createContext, useContext, useEffect, useState } from "react";

// Check for reduced motion preference
const getReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const MotionContext = createContext({
  reducedMotion: false,
  setReducedMotion: () => {},
});

export function MotionProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion, setReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);

// Optimized animation variants that respect reduced motion
export const fadeInUp = (reducedMotion = false) => ({
  initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  animate: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  exit: reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 },
});

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideInLeft = (reducedMotion = false) => ({
  initial: reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
  animate: reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
  exit: reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
});

export const slideInRight = (reducedMotion = false) => ({
  initial: reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
  animate: reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
  exit: reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
});

export const scaleIn = (reducedMotion = false) => ({
  initial: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
  animate: reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 },
  exit: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
});

// Page transition variants
export const pageTransition = (reducedMotion = false) => ({
  initial: reducedMotion 
    ? { opacity: 0 } 
    : { opacity: 0, y: 8 },
  animate: reducedMotion 
    ? { opacity: 1 } 
    : { opacity: 1, y: 0 },
  exit: reducedMotion 
    ? { opacity: 0 } 
    : { opacity: 0, y: -8 },
  transition: reducedMotion 
    ? { duration: 0.15 } 
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
});

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Optimized spring config for smooth but performant animations
export const springConfig = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1,
};

// Lightweight spring for hover effects
export const hoverSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

// Performance-optimized transition
export const quickTransition = {
  duration: 0.2,
  ease: "easeOut",
};
