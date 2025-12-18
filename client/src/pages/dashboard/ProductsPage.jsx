import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils";
import { useMyProducts, useDeleteProduct } from "@/hooks/useProducts";
import AddProductModal from "@/components/dashboard/AddProductModal";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  Star,
  Eye,
} from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch real data
  const { data: products, isLoading, error } = useMyProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  // Ensure productList is an array (handle API returning object or undefined)
  const productList = Array.isArray(products) ? products : (products?.products || []);

  const filteredProducts = productList.filter((product) => {
    const title = product.title || ""; // Fallback for missing title
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          Products
        </h1>
        <p className="text-stone-600">
          Manage your product listings and inventory
        </p>
      </div>
      <Button onClick={() => setIsModalOpen(true)}>
        <Plus className="w-4 h-4" strokeWidth={1.5} />
        Add Product
      </Button>
    </motion.div>

    {/* Filters */}
    <div className="bg-white rounded-2xl p-4 border border-stone-200/60 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
        >
          <option value="all">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
          <option value="coffee">Coffee</option>
          <option value="cacao">Cacao</option>
          <option value="spices">Spices</option>
          <option value="textile">Textiles</option>
        </select>
      </div>
    </div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={6} />
      ) : error ? (
        <div className="text-center py-16 text-red-600">
          Failed to load products.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={product.images?.[0]?.url || "https://via.placeholder.com/400x300"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 
                {product.isCertified && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="certified">Certified</Badge>
                  </div>
                )}
                */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-stone-50">
                      <Eye className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    </button>
                    {/* Edit button functionality pending */}
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-stone-50">
                      <Edit className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-forest-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-serif font-semibold text-stone-900 mt-1 line-clamp-1">
                      {product.title}
                    </h3>
                  </div>
                  <button className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-50">
                    <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                  <Star className="w-4 h-4 text-clay-500 fill-current" strokeWidth={1.5} />
                  <span>4.8</span> {/* Mock rating */}
                  <span className="text-stone-300">•</span>
                  <span>Stock: {product.stock} {product.unit}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <div>
                    <p className="text-xs text-stone-500">Price/{product.unit}</p>
                    <p className="text-lg font-serif font-bold text-forest-800">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* Edit functionality to be implemented */}
                    <button className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-stone-900 mb-2">No products found</h3>
          <p className="text-stone-500 mb-6">Try adjusting your search or add a new product</p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </DashboardLayout>
  );
}
