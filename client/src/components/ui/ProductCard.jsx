import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Badge from "./Badge";
import { MapPin, Star, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product, className }) {
  // Normalize data (handle both potential formats if legacy mock data exists, but prioritize real DB structure)
  const id = product._id || product.id;
  const title = product.title || product.name || "Untitled Product";
  const initialImage = product.images?.[0]?.url || product.image || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop";
  const category = product.category || "General";
  const description = product.description || "No description available.";
  const price = product.price || product.pricePerKg || 0;
  const unit = product.unit || "unit";
  const stock = product.stock || 0;

  // Image State for Fallback
  const [imgSrc, setImgSrc] = useState(initialImage);
  const [imgError, setImgError] = useState(false);

  // Farmer info
  const farmerName = product.farmerId?.name || product.farmer?.name || "Unknown Farmer";
  // We don't have province on farmerId yet (populate only returns name/email usually, unless we changed it)
  // But let's check if it exists or fallback
  const province = product.farmerId?.address?.province || product.farmer?.province || "Philippines"; 

  // Derived or defaulted
  const rating = product.rating || 4.8; // Mock rating for now
  const isCertified = product.isCertified || false; // Mock for now

  return (
    <Link to={`/marketplace/${id}`}>
      <motion.div
        className={cn(
          "group relative bg-white rounded-2xl border border-stone-200/60 overflow-hidden",
          "shadow-sm hover:shadow-xl hover:border-stone-300/80",
          "transition-all duration-300 ease-out cursor-pointer",
          className
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
          {!imgError ? (
            <img
              src={imgSrc}
              alt={title}
              onError={() => {
                setImgError(true);
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
              <ShoppingBag className="w-10 h-10 mb-2 opacity-20" strokeWidth={1} />
              <span className="text-xs font-medium uppercase tracking-wider opacity-50">No Image Available</span>
            </div>
          )}
          {/* Gradient Overlay */}
          {!imgError && <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />}
        
          {/* Certified Badge */}
          {isCertified && (
            <div className="absolute top-3 right-3">
              <Badge variant="certified">Taglay Certified</Badge>
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-stone-700 rounded-full capitalize">
              {category}
            </span>
          </div>
        </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-stone-900 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-clay-600">
            <Star className="w-4 h-4 fill-current" strokeWidth={1.5} />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Farmer Info */}
        <p className="text-sm text-stone-600 mb-1">{farmerName}</p>
        <div className="flex items-center gap-1 text-stone-500 mb-4">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="text-xs">{province}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {description}
        </p>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-3 border-t border-stone-100">
          <div>
            <p className="text-xs text-stone-500 mb-0.5">Price per {unit}</p>
            <p className="text-xl font-serif font-semibold text-forest-800">
              {formatPrice(price)}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-forest-900 text-white text-sm font-medium rounded-xl hover:bg-forest-800 transition-colors">
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            Order
          </button>
        </div>

        {/* Stock Note */}
        <p className="text-xs text-stone-400 mt-2">
          {stock > 0 ? `${stock} ${unit} available` : "Out of Stock"}
        </p>
      </div>
    </motion.div>
    </Link>
  );
}
