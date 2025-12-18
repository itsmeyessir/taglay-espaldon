import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          {
            "bg-forest-900 text-white hover:bg-forest-800 focus:ring-forest-500":
              variant === "primary",
            "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50 hover:border-stone-300 focus:ring-stone-300":
              variant === "secondary",
            "text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-300":
              variant === "ghost",
            "border-2 border-forest-600 text-forest-700 hover:bg-forest-50 focus:ring-forest-500":
              variant === "outline",
          },
          // Sizes
          {
            "px-3 py-1.5 text-sm rounded-lg": size === "sm",
            "px-5 py-2.5 text-sm rounded-xl": size === "md",
            "px-6 py-3 text-base rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
