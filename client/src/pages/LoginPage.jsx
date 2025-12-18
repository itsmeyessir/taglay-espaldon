import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State for displaying login errors
  const { login, isLoading } = useAuth(); // Get login function and loading state from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // This is not sent to backend but can be handled client-side
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await login({ 
        email: formData.email, 
        password: formData.password,
        rememberMe: formData.rememberMe 
      });
      // If login is successful, useAuth context handles navigation.
    } catch (err) {
      // Backend error messages are in err.response.data.message
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">T</span>
            </div>
            <span className="font-serif font-bold text-xl text-stone-900">
              Taglay
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
              Welcome back
            </h1>
            <p className="text-stone-600">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3 text-sm"
                role="alert"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                  strokeWidth={1.5}
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-stone-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-forest-700 hover:text-forest-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                  strokeWidth={1.5}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-stone-600">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-cream-50 text-stone-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-stone-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-stone-700">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-stone-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-forest-700 hover:text-forest-800 font-medium"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 to-forest-800/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&h=1600&fit=crop"
          alt="Philippine agriculture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Leaf className="w-16 h-16 mx-auto mb-6 text-clay-400" strokeWidth={1} />
            <h2 className="text-3xl font-serif font-bold mb-4">
              Connecting Communities
            </h2>
            <p className="text-white/80 max-w-sm mx-auto">
              Join hundreds of cooperatives and businesses already transforming 
              Philippine agricultural trade.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[
                  "/images/team/adoy.jpeg",
                  "/images/team/dhan.jpeg",
                  "/images/team/gelo.jpeg",
                  "/images/team/robbie.jpeg"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Member"
                    className="w-10 h-10 rounded-full border-2 border-white/40 object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">
                250+ active members
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
