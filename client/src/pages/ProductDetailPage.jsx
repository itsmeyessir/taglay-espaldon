import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useProduct } from "@/hooks/useProducts"; // Import custom hook
import PageLoader from "@/components/PageLoader"; // Import PageLoader
import PurchaseModal from "@/components/checkout/PurchaseModal"; // Import PurchaseModal
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Users,
  Shield,
  Truck,
  Package,
  Minus,
  Plus,
  Heart,
  Share2,
  MessageCircle,
  CheckCircle,
  ShoppingBag, // Import ShoppingBag
} from "lucide-react";

// Dummy reviews data (still mock for now as backend doesn't support reviews yet)
const reviews = [
  {
    id: 1,
    author: "Cafe Manila",
    role: "Coffee Shop Owner",
    rating: 5,
    date: "2024-11-15",
    content: "Exceptional quality! Our customers love the rich, complex flavors. Will definitely order again.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    author: "The Green Kitchen",
    role: "Restaurant Manager",
    rating: 5,
    date: "2024-11-10",
    content: "Fresh and authentic. The cooperative is very responsive and shipping was faster than expected.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    author: "Artisan Roasters PH",
    role: "Specialty Coffee Roaster",
    rating: 4,
    date: "2024-10-28",
    content: "Great beans with consistent quality. Minor delay in shipping but the product quality made up for it.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [imgError, setImgError] = useState(false); // Image error state

  // Fetch product data using custom hook
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Product Not Found
          </h1>
          <Link to="/marketplace">
            <Button>
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Ensure default values if some fields are missing
  const minOrder = product.stock > 0 ? 1 : 0; // Simplified min order logic
  const totalPrice = product.price * quantity; // Assuming price is total for the quantity unit, or per unit. Backend says 'price'
  
  // Safe access for nested farmer/user data
  const farmerName = product.farmerId?.name || "Unknown Farmer";
  const farmerEmail = product.farmerId?.email || "";
  
  // Use a default image if none provided
  const productImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop"; 

  // Mocking rating for now
  const productRating = 4.8;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar variant="solid" />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-6 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/marketplace" className="text-stone-500 hover:text-stone-700">
              Marketplace
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 capitalize">{product.category}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-lg flex items-center justify-center bg-stone-100">
              {!imgError ? (
                <img
                  src={productImage}
                  alt={product.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-stone-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" strokeWidth={1} />
                  <span className="text-sm font-medium uppercase tracking-wider opacity-50">No Image Available</span>
                </div>
              )}
              {/* Certification Badge - Assuming logic */}
              {product.farmerId?.role === 'farmer' && (
                <div className="absolute top-4 right-4">
                  <Badge variant="certified" className="text-sm px-3 py-1.5">
                    <Shield className="w-4 h-4" strokeWidth={1.5} />
                    Taglay Certified
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Category & Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-forest-100 text-forest-700 text-sm font-medium rounded-full capitalize">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full border transition-colors ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-stone-200 text-stone-400 hover:text-stone-600"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    strokeWidth={1.5}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 rounded-full border border-stone-200 text-stone-400 hover:text-stone-600 transition-colors">
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Title & Rating */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productRating)
                        ? "text-clay-500 fill-current"
                        : "text-stone-200"
                    }`}
                    strokeWidth={1.5}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-stone-700">
                  {productRating}
                </span>
              </div>
              <span className="text-stone-300">|</span>
              <span className="text-sm text-stone-500">
                {reviews.length} reviews
              </span>
            </div>

            {/* Farmer Info */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/60 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-forest-700" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900">
                    {farmerName}
                  </h3>
                  <p className="text-sm text-stone-500 mb-2">
                    Email: {farmerEmail}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} />
                      {/* Placeholder for province as it's not in user model yet */}
                      Philippines 
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {/* Placeholder harvest date */}
                      Fresh Harvest
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-sm text-stone-500 mb-1">Price per {product.unit}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif font-bold text-forest-800">
                  {formatPrice(product.price)}
                </span>
                <span className="text-stone-500">/ {product.unit}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Quantity (Stock: {product.stock} {product.unit})
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <span className="px-6 py-3 text-lg font-medium text-stone-900 border-x border-stone-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
                {/* <span className="text-stone-500">
                  = {quantity * product.minOrder} kg total
                </span> */}
              </div>
            </div>

            {/* Total & CTA */}
            <div className="flex items-center justify-between p-4 bg-forest-50 rounded-2xl mb-6">
              <div>
                <p className="text-sm text-forest-700 mb-1">Order Total</p>
                <p className="text-2xl font-serif font-bold text-forest-900">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <Button size="lg" disabled={product.stock === 0} onClick={() => setIsModalOpen(true)}>
                <Package className="w-5 h-5" strokeWidth={1.5} />
                {product.stock > 0 ? "Add to Order" : "Out of Stock"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="w-6 h-6 text-forest-600 mb-2" strokeWidth={1.5} />
                <span className="text-xs text-stone-600">Quality Verified</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="w-6 h-6 text-forest-600 mb-2" strokeWidth={1.5} />
                <span className="text-xs text-stone-600">Tracked Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <CheckCircle className="w-6 h-6 text-forest-600 mb-2" strokeWidth={1.5} />
                <span className="text-xs text-stone-600">Secure Payment</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex border-b border-stone-200">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-forest-700"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-700"
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-stone max-w-none"
              >
                <p className="text-stone-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200/60">
                    <h3 className="font-semibold text-stone-900 mb-4">Product Details</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Category</dt>
                        <dd className="text-stone-900 font-medium capitalize">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Stock</dt>
                        <dd className="text-stone-900 font-medium">{product.stock} {product.unit}</dd>
                      </div>
                      {/* Add more dynamic details here */}
                    </dl>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                      Customer Reviews
                    </h3>
                    <p className="text-stone-500">
                      {reviews.length} reviews from verified buyers
                    </p>
                  </div>
                  <Button variant="secondary">
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-6 rounded-2xl border border-stone-200/60"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-stone-900">
                                {review.author}
                              </h4>
                              <p className="text-sm text-stone-500">{review.role}</p>
                            </div>
                            <span className="text-sm text-stone-400">
                              {new Date(review.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-clay-500 fill-current"
                                    : "text-stone-200"
                                }`}
                                strokeWidth={1.5}
                              />
                            ))}
                          </div>
                          <p className="text-stone-600">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">
                  Shipping Information
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 text-forest-700" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">
                        Delivery Timeline
                      </h4>
                      <p className="text-stone-600">
                        Orders are typically processed within 2-3 business days. 
                        Delivery to Metro Manila takes 3-5 business days depending on your location.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-forest-700" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">
                        Packaging
                      </h4>
                      <p className="text-stone-600">
                        Products are carefully packaged by the cooperative to ensure freshness. 
                        Coffee and cacao are vacuum-sealed, textiles are wrapped in protective covers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-forest-700" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">
                        Quality Guarantee
                      </h4>
                      <p className="text-stone-600">
                        All Taglay Certified products come with our quality guarantee. 
                        If you're not satisfied, contact us within 48 hours of delivery for a full refund.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Purchase Modal */}
        <PurchaseModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
          quantity={quantity}
        />
      </main>

      <Footer showCTA={false} />
    </div>
  );
}
