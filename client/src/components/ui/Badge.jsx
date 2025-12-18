import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

export default function Badge({
  variant = "default",
  children,
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full",
        {
          "bg-teal-500/10 text-teal-600 border border-teal-500/20":
            variant === "certified",
          "bg-forest-100 text-forest-700 border border-forest-200":
            variant === "success",
          "bg-clay-100 text-clay-700 border border-clay-200":
            variant === "pending",
          "bg-blue-100 text-blue-700 border border-blue-200":
            variant === "transit",
          "bg-stone-100 text-stone-600 border border-stone-200":
            variant === "default",
        },
        className
      )}
    >
      {variant === "certified" && <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.5} />}
      {children}
    </span>
  );
}
