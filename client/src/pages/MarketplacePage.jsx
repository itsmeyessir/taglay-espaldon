import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MarketplaceContent from "@/components/marketplace/MarketplaceContent";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar variant="solid" />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Marketplace
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl">
              Discover premium products from verified Philippine cooperatives. 
              Coffee, cacao, textiles, and more — sourced directly from the farm.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <MarketplaceContent />
      </div>

      <Footer showCTA={false} />
    </div>
  );
}
