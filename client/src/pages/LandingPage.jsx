import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { partners } from "@/lib/data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Coffee,
  Leaf,
  Truck,
  Shield,
  Users,
  ChartBar,
  Handshake,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar variant="transparent" />
      <Hero />

      {/* Partners Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center text-sm text-stone-500 uppercase tracking-wider font-medium">
            Trusted by leading Metro Manila businesses
          </p>
        </div>
        <InfiniteMovingCards items={partners} speed="slow" />
      </section>

      {/* How It Works - Bento Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-forest-50 text-forest-700 text-sm font-medium rounded-full">
              <Leaf className="w-4 h-4" strokeWidth={1.5} />
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Farm to City, Simplified
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We bridge the gap between rural cooperatives and urban businesses,
              ensuring quality, traceability, and fair pricing.
            </p>
          </motion.div>

          <BentoGrid className="gap-6">
            <BentoGridItem
              className="md:col-span-2"
              title="Discover Premium Products"
              description="Browse our curated marketplace of verified coffee, cacao, and artisan goods from across the Philippine archipelago."
              header={
                <div className="h-40 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=60"
                    alt="Coffee beans"
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              icon={<Coffee className="w-5 h-5 text-clay-600" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title="Verified Farmers"
              description="Every cooperative is vetted for quality, sustainability, and fair labor practices."
              icon={<Shield className="w-5 h-5 text-forest-600" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title="Direct Connection"
              description="No middlemen. Connect directly with cooperatives for better prices."
              icon={<Handshake className="w-5 h-5 text-teal-600" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title="End-to-End Logistics"
              description="From highland farms to your Metro Manila doorstep."
              icon={<Truck className="w-5 h-5 text-blue-600" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title="Real-time Tracking"
              description="Monitor your orders with live logistics updates."
              icon={<ChartBar className="w-5 h-5 text-purple-600" strokeWidth={1.5} />}
            />
            <BentoGridItem
              className="md:col-span-2"
              title="Community Impact"
              description="Every purchase directly supports rural farming communities across 34 provinces."
              header={
                <div className="h-40 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=600&auto=format&fit=crop&q=60"
                    alt="Filipino farmers"
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              icon={<Users className="w-5 h-5 text-clay-600" strokeWidth={1.5} />}
            />
          </BentoGrid>
        </div>
      </section>

      <Footer />
    </div>
  );
}
