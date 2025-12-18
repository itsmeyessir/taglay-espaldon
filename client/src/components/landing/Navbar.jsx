import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Define scroll thresholds for pages with dark hero + light sections + dark footer
const getPageThresholds = (pathname) => {
  if (pathname === "/") {
    // Landing page: Hero (80vh) → Partners/How It Works (light) → Footer (dark)
    const heroHeight = window.innerHeight * 0.8 - 100;
    const lightSectionsHeight = 1500;
    return {
      lightSectionStart: heroHeight,
      lightSectionEnd: heroHeight + lightSectionsHeight,
    };
  }
  
  if (pathname === "/about" || pathname === "/contact") {
    // About/Contact page: Hero (70-80vh) → Content sections (light) → Footer (dark)
    const heroHeight = window.innerHeight * 0.7 - 100;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = 600;
    return {
      lightSectionStart: heroHeight,
      lightSectionEnd: documentHeight - footerHeight - window.innerHeight + 100,
    };
  }
  
  return null;
};

// Check if we're near the footer (dark section at the bottom)
const isNearFooter = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Footer is approximately 600px tall (newsletter + main footer + bottom bar)
  const footerHeight = 600;
  
  // Check if we've scrolled past the point where footer would be visible at navbar position
  return scrollY + windowHeight > documentHeight - footerHeight + 100;
};

export default function Navbar({ variant = "transparent" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState(variant);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Check if this page has section-based thresholds (dark hero + light + dark footer)
      const thresholds = getPageThresholds(location.pathname);
      
      if (thresholds && variant === "transparent") {
        // Section-based logic for pages with dark hero (Landing, About)
        if (scrollY >= thresholds.lightSectionStart && 
            scrollY < thresholds.lightSectionEnd) {
          setNavbarStyle("solid");
        } else {
          setNavbarStyle("transparent");
        }
        return;
      }
      
      // For other pages: solid by default, transparent when near dark footer
      if (variant === "solid") {
        if (isNearFooter()) {
          setNavbarStyle("transparent");
        } else {
          setNavbarStyle("solid");
        }
      } else {
        setNavbarStyle(variant);
      }
    };

    // Check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [variant, location.pathname]);

  // Determine if navbar should be transparent
  const isTransparent = navbarStyle === "transparent";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-stone-200/50 shadow-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">T</span>
            </div>
            <span
              className={cn(
                "font-serif font-bold text-xl transition-colors duration-300",
                isTransparent ? "text-white" : "text-stone-900"
              )}
            >
              Taglay
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-forest-600",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/marketplace"
              className={cn(
                "p-2 rounded-lg transition-colors duration-300",
                isTransparent
                  ? "text-white/80 hover:bg-white/10"
                  : "text-stone-600 hover:bg-stone-100"
              )}
              title="Search Marketplace"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <button
              className={cn(
                "p-2 rounded-lg transition-colors duration-300 relative",
                isTransparent
                  ? "text-white/80 hover:bg-white/10"
                  : "text-stone-600 hover:bg-stone-100"
              )}
              title="Notifications"
            >
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-clay-500 rounded-full" />
            </button>
            <Link
              to="/login"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300",
                isTransparent
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-forest-900 text-white hover:bg-forest-800"
              )}
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-medium">Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isTransparent ? "text-white" : "text-stone-900"
                )}
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isTransparent ? "text-white" : "text-stone-900"
                )}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 bg-cream-50"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <Link 
                to="/" 
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">T</span>
                </div>
                <span className="font-serif font-bold text-xl text-stone-900">
                  Taglay
                </span>
              </Link>
              <button
                className="p-2 rounded-lg hover:bg-stone-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-stone-900" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-4 text-base font-medium text-stone-700 hover:text-forest-600 transition-colors border-b border-stone-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-forest-900 text-white hover:bg-forest-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
