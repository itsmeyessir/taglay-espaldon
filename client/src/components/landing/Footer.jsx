import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, ArrowUpRight, Send, Leaf, Users } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Footer({ showCTA = true, showAboutCTA = false }) {
  return (
    <footer className="relative bg-forest-950">
      {/* Unified Background with subtle texture - spans entire footer including CTA */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-forest-800/30 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-verified-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-teal-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-clay-600/10 rounded-full blur-[80px]" />
      </div>

      {/* About Page CTA - "Join Our Growing Community" - only show on About page */}
      {showAboutCTA && (
        <>
          <div className="relative">
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
              <motion.div
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <Users className="w-16 h-16 text-clay-400" strokeWidth={1.5} />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                  Join Our Growing Community
                </h2>
                <p className="text-lg text-cream-100/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Whether you're a cooperative looking to expand your reach or a business 
                  seeking premium local products, Taglay is here for you.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
                    <Button size="lg" className="bg-white text-forest-900 hover:bg-cream-100">
                      Get Started
                      <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                    </Button>
                  </Link>
                  <Link to="/marketplace" onClick={() => window.scrollTo(0, 0)}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-white border border-white/20 hover:bg-white/10"
                    >
                      Explore Marketplace
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider between About CTA and Newsletter */}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </>
      )}

      {/* CTA Section - only show on landing page */}
      {showCTA && (
        <>
          <div className="relative">
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
              <motion.div
                className="relative bg-linear-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/10 overflow-hidden text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Inner glow decorations - positioned top-right and bottom-left */}
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-verified-500/25 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-clay-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    Ready to Source Premium?
                  </h2>
                  <p className="text-lg text-cream-100/70 mb-8 max-w-2xl mx-auto">
                    Join Metro Manila's leading cafés, hotels, and restaurants 
                    sourcing directly from Philippine cooperatives.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/marketplace" onClick={() => window.scrollTo(0, 0)}>
                      <Button size="lg" className="bg-white text-forest-900 hover:bg-cream-100">
                        Explore Marketplace
                        <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                      </Button>
                    </Link>
                    <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-white border border-white/20 hover:bg-white/10"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider between CTA and Newsletter */}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </>
      )}
      
      {/* Newsletter Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            className="relative bg-linear-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background decoration - orange/clay tones like CTA */}
            <div className="absolute -top-8 -left-8 w-52 h-52 bg-clay-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-verified-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full mb-4">
                  <Leaf className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-white/80">Join our community</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                  Stay updated with Taglay
                </h3>
                <p className="text-cream-100/60 max-w-md">
                  Get the latest on new cooperatives, seasonal harvests, and exclusive platform updates.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-verified-400 focus:bg-white/10 transition-all"
                  />
                </div>
                <button 
                  type="button"
                  className="relative z-20 px-6 py-4 bg-white text-forest-900 font-semibold rounded-xl flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-cream-100 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main Footer */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center group-hover:bg-verified-400 transition-colors">
                  <span className="text-forest-900 font-serif font-bold text-xl">T</span>
                </div>
                <span className="font-serif font-bold text-2xl text-white">Taglay</span>
              </Link>
              <p className="text-cream-100/60 text-sm leading-relaxed mb-6">
                Bridging Philippine rural cooperatives with Metro Manila's finest 
                businesses. Farm-to-city, traceable, premium.
              </p>
              <div className="flex gap-3">
                <SocialLink href="#" icon={<Facebook className="w-4 h-4" strokeWidth={1.5} />} />
                <SocialLink href="#" icon={<Instagram className="w-4 h-4" strokeWidth={1.5} />} />
                <SocialLink href="#" icon={<Twitter className="w-4 h-4" strokeWidth={1.5} />} />
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-serif font-semibold text-lg text-white mb-6">Platform</h4>
              <ul className="space-y-4">
                <FooterLink href="/marketplace">Marketplace</FooterLink>
                <FooterLink href="/dashboard">Sourcing Dashboard</FooterLink>
                <FooterLink href="/about">About Taglay</FooterLink>
                <FooterLink href="#">For Cooperatives</FooterLink>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-serif font-semibold text-lg text-white mb-6">Resources</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Certification Process</FooterLink>
                <FooterLink href="#">Logistics Partners</FooterLink>
                <FooterLink href="#">Pricing Guide</FooterLink>
                <FooterLink href="#">FAQs</FooterLink>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-semibold text-lg text-white mb-6">Contact</h4>
              <ul className="space-y-5">
                <motion.li 
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-verified-500 group-hover:border-verified-500 transition-colors shrink-0">
                    <MapPin className="w-4 h-4 text-white/70 group-hover:text-forest-950" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-cream-100/60 group-hover:text-white transition-colors pt-1.5">
                    BGC, Taguig City<br />Metro Manila, Philippines
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-verified-500 group-hover:border-verified-500 transition-colors shrink-0">
                    <Phone className="w-4 h-4 text-white/70 group-hover:text-forest-950" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-cream-100/60 group-hover:text-white transition-colors">+63 2 8123 4567</span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-verified-500 group-hover:border-verified-500 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-white/70 group-hover:text-forest-950" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-cream-100/60 group-hover:text-white transition-colors">hello@taglay.ph</span>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-cream-100/40">
                © 2025 Taglay. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link to="#" className="text-sm text-cream-100/40 hover:text-verified-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-sm text-cream-100/40 hover:text-verified-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        to={href}
        className="group flex items-center gap-2 text-sm text-cream-100/50 hover:text-white transition-all"
      >
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-verified-400 group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-verified-400" />
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }) {
  return (
    <motion.a
      href={href}
      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cream-100/60 hover:bg-verified-500 hover:text-forest-950 hover:border-verified-500 transition-all"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}
