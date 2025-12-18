import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900",
            "placeholder:text-stone-400",
            "focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500",
            "transition-all duration-200",
            error && "border-red-300 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
