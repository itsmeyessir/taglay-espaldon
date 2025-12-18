import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CreditCard, Package, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { useCreateOrder } from "@/hooks/useOrders";
import { useNavigate } from "react-router-dom";

export default function PurchaseModal({ isOpen, onClose, product, quantity }) {
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();
  const [error, setError] = useState(null);
  
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Philippines"
  });

  const totalPrice = product.price * quantity;
  const shippingFee = 150; // Flat rate for prototype
  const finalTotal = totalPrice + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const orderPayload = {
        items: [{
          productId: product._id,
          title: product.title,
          quantity: quantity,
          price: product.price,
          image: product.images?.[0]?.url
        }],
        shippingAddress,
        paymentMethod: "Cash on Delivery",
        taxPrice: 0,
        shippingPrice: shippingFee,
        totalPrice: finalTotal
      };

      await createOrder(orderPayload);
      onClose();
      navigate('/dashboard/orders'); // Redirect to orders page to see the new order
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to place order");
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
            className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Confirm Purchase
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

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              {/* Order Summary */}
              <div className="bg-stone-50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Order Summary
                </h3>
                <div className="flex gap-4 mb-4">
                  <img 
                    src={product.images?.[0]?.url || "https://via.placeholder.com/100"} 
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover bg-white"
                  />
                  <div>
                    <p className="font-medium text-stone-900">{product.title}</p>
                    <p className="text-sm text-stone-500">
                      {quantity} x {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-stone-900">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
                <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping Fee</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Shipping Address
                </h3>
                <div className="space-y-3">
                  <Input
                    name="address"
                    placeholder="Street Address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="city"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="postalCode"
                      placeholder="Postal Code"
                      value={shippingAddress.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Method
                </h3>
                <div className="p-4 border border-forest-200 bg-forest-50 rounded-xl flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-[5px] border-forest-600 bg-white"></div>
                  <span className="font-medium text-forest-900">Cash on Delivery (COD)</span>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-stone-200 bg-stone-50 flex justify-end gap-3">
              <Button variant="secondary" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Placing Order..." : `Confirm Order • ${formatPrice(finalTotal)}`}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
