import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return "20s";
      case "normal":
        return "40s";
      case "slow":
        return "80s";
      default:
        return "40s";
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <motion.div
        className={cn(
          "flex gap-8 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationDuration: getSpeed(),
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="shrink-0 flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-stone-200 shadow-sm"
          >
            <span className="text-2xl">{item.logo}</span>
            <span className="text-sm font-medium text-stone-700 whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
}
