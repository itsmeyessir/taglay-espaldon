import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/useProducts";
import Button from "@/components/ui/Button";

const categories = [
  { id: "all", name: "All Products" },
  { id: "fruits", name: "Fruits" },
  { id: "vegetables", name: "Vegetables" },
  { id: "grains", name: "Grains" },
  { id: "spices", name: "Spices" },
  { id: "coffee", name: "Coffee" },
  { id: "cacao", name: "Cacao" },
  { id: "textile", name: "Textile" },
  { id: "handicrafts", name: "Handicrafts" },
];

const provinces = [
  "All Provinces",
  "Mountain Province",
  "Benguet",
  "Davao del Sur",
  "Batangas",
  "Ifugao",
  "Sulu",
  "Bukidnon",
  "Palawan",
];

export default function MarketplaceContent({ 
  header = null, // Optional custom header
  className = "" 
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  // Use custom hook to fetch products
  const { data, isLoading, error } = useProducts({
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    keyword: searchQuery,
    page: page,
    limit: 12, // Show 12 items per page for better grid alignment
  });

  const products = data?.products || [];
  const totalPages = data?.pages || 1;
  const totalProducts = data?.total || 0;

  // We rely on backend filtering now, but province filtering is still client-side if needed
  // However, with pagination, client-side filtering breaks page count. 
  // Ideally, province should be passed to backend. For now, we skip province filtering or assume backend handles it later.
  const filteredProducts = products; 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {header}

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-forest-900 text-white"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all",
            showFilters
              ? "bg-forest-50 border-forest-200 text-forest-700"
              : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl border border-stone-200 p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Province Filter */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Province
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500">
                <option>Any Price</option>
                <option>₱0 - ₱500</option>
                <option>₱500 - ₱1,000</option>
                <option>₱1,000+</option>
              </select>
            </div>

            {/* Certification */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Certification
              </label>
              <select className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500">
                <option>All Products</option>
                <option>Taglay Certified Only</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-stone-600">
          Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> of <span className="font-semibold text-stone-900">{totalProducts}</span> products
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-500">Sort by:</span>
          <select className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={8} columns={4} />
      ) : error ? (
         <div className="text-center py-16 text-red-600">
           Failed to load products. Please try again later.
         </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pb-8">
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-stone-700">
                  Page {page} of {totalPages}
                </span>
              </div>

              <Button 
                variant="outline" 
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-stone-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
            No products found
          </h3>
          <p className="text-stone-600 mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setSelectedProvince("All Provinces");
            }}
            className="px-4 py-2 bg-forest-900 text-white text-sm font-medium rounded-xl hover:bg-forest-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
