import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-forest-950 via-forest-900 to-forest-800" />
        
        {/* Organic shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-700 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-clay-600 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-600 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,...')] bg-repeat" />
        
        {/* Hero Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&auto=format&fit=crop&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950 via-transparent to-forest-950/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <Leaf className="w-4 h-4 text-forest-300" strokeWidth={1.5} />
              <span className="text-sm text-forest-100 font-medium">
                Farm-to-City B2B Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              Source Premium,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-forest-300 to-teal-400">
                Directly
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-forest-200/80 mb-8 max-w-xl leading-relaxed">
              Connect your business with verified Philippine cooperatives. 
              Premium coffee, cacao, and artisan textiles — with full 
              traceability from farm to your doorstep.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-forest-900 hover:bg-forest-50">
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-forest-200/70">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                <span className="text-sm">Verified Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                <span className="text-sm">End-to-End Logistics</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats/Visual */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                {/* Province Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatCard
                    label="Active Cooperatives"
                    value="127+"
                    trend="+12 this month"
                  />
                  <StatCard
                    label="Provinces Covered"
                    value="34"
                    trend="Luzon, Visayas, Mindanao"
                  />
                  <StatCard
                    label="Products Sourced"
                    value="450+"
                    trend="Coffee, Cacao, Textiles"
                  />
                  <StatCard
                    label="Metro Buyers"
                    value="89"
                    trend="Cafés, Hotels, Restaurants"
                  />
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&auto=format&fit=crop&q=60"
                    alt="Philippine coffee farm"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-white/70 mb-1">Featured Origin</p>
                    <p className="text-white font-serif font-semibold">
                      Sagada, Mountain Province
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-teal-500 text-white px-4 py-2 rounded-xl shadow-lg">
                <span className="text-sm font-semibold">98% On-Time Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-cream-50"
          />
        </svg>
      </div>
    </section>
  );
}

function StatCard({ label, value, trend }) {
  return (
    <motion.div 
      className="bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer"
      whileHover={{ 
        scale: 1.03, 
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <p className="text-xs text-forest-300 mb-1">{label}</p>
      <p className="text-2xl font-serif font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-forest-400">{trend}</p>
    </motion.div>
  );
}
