import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Save, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateProduct } from "@/hooks/useProducts";

const categories = [
  { id: "fruits", name: "Fruits" },
  { id: "vegetables", name: "Vegetables" },
  { id: "grains", name: "Grains" },
  { id: "spices", name: "Spices" },
  { id: "coffee", name: "Coffee" },
  { id: "cacao", name: "Cacao" },
  { id: "textile", name: "Textiles" },
  { id: "handicrafts", name: "Handicrafts" },
  { id: "dairy", name: "Dairy" },
  { id: "meat", name: "Meat" },
  { id: "seafood", name: "Seafood" },
  { id: "others", name: "Others" },
];

export default function AddProductModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    unit: "kg",
    category: "fruits",
    imageUrl: "",
  });
  const [error, setError] = useState(null);

  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Basic validation
      if (!formData.title || !formData.price || !formData.stock) {
        throw new Error("Please fill in all required fields");
      }

      await createProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
      });

      onClose(); // Close modal on success
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        unit: "kg",
        category: "fruits",
        imageUrl: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create product");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Add New Product
              </h2>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Product Title *
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Organic Sagada Coffee"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">₱</span>
                        <Input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="pl-8"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Unit *
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
                      >
                        <option value="kg">Per kg</option>
                        <option value="gram">Per gram</option>
                        <option value="pack">Per pack</option>
                        <option value="sack">Per sack</option>
                        <option value="piece">Per piece</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Available Stock *
                    </label>
                    <Input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your product..."
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Image URL
                    </label>
                    <Input
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-stone-500 mt-1">
                      Paste a direct link to an image (e.g. from Unsplash).
                    </p>
                  </div>

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image"; }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-stone-200 bg-stone-50 flex justify-end gap-3">
              <Button variant="secondary" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
