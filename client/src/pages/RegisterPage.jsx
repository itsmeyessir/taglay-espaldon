import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Building2,
  Phone,
  MapPin,
  Users,
  Store,
  Check,
  Leaf,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const accountTypes = [
  {
    id: "cooperative",
    icon: Users,
    title: "Cooperative",
    description: "For agricultural cooperatives looking to sell products",
    features: [
      "List and sell your products",
      "Connect with Metro Manila buyers",
      "Track orders and logistics",
      "Access analytics dashboard",
    ],
  },
  {
    id: "business",
    icon: Store,
    title: "Business",
    description: "For businesses sourcing quality local products",
    features: [
      "Browse verified products",
      "Direct cooperative connections",
      "Bulk ordering system",
      "Supply chain tracking",
    ],
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State for displaying registration errors
  const { register, isLoading } = useAuth(); // Get register function and loading state from context

  const [formData, setFormData] = useState({
    accountType: "", // Will map to 'role'
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "", // Will map to 'name'
    contactPerson: "", // Not directly mapped to backend User model
    phone: "", // Not directly mapped
    province: "", // Not directly mapped
    address: "", // Not directly mapped
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, accountType: type }));
  };

  const handleNext = () => {
    setError(null); // Clear errors when moving to next step
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null); // Clear errors when moving back
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Map frontend formData to backend User model fields
    const userData = {
      name: formData.contactPerson,
      organizationName: formData.organizationName,
      email: formData.email,
      phone: formData.phone,
      address: {
        province: formData.province,
        // Other address fields are not yet collected in this form step
      },
      password: formData.password,
      role: formData.accountType === 'cooperative' ? 'farmer' : 'buyer',
    };

    try {
      await register(userData);
      // If registration is successful, useAuth context handles navigation.
    } catch (err) {
      // Backend error messages are in err.response.data.message
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  const canProceedStep1 = formData.accountType !== "";
  const canProceedStep2 =
    formData.email !== "" &&
    formData.password !== "" &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 6; // Changed to 6 to match backend validation
  const canSubmit =
    formData.organizationName !== "" &&
    formData.contactPerson !== "" &&
    formData.phone !== "" &&
    formData.agreeTerms &&
    canProceedStep2; // Ensure step 2 criteria are met for submission

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">T</span>
            </div>
            <span className="font-serif font-bold text-xl text-stone-900">
              Taglay
            </span>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s
                      ? "bg-forest-900 text-white"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {step > s ? (
                    <Check className="w-4 h-4" strokeWidth={2} />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-1 rounded transition-colors ${
                      step > s ? "bg-forest-900" : "bg-stone-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Account Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                    Join Taglay
                  </h1>
                  <p className="text-stone-600">
                    Select your account type to get started
                  </p>
                </div>

                <div className="space-y-4">
                  {accountTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleAccountTypeSelect(type.id)}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                        formData.accountType === type.id
                          ? "border-forest-500 bg-forest-50"
                          : "border-stone-200 hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            formData.accountType === type.id
                              ? "bg-forest-500 text-white"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          <type.icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-stone-900 mb-1">
                            {type.title}
                          </h3>
                          <p className="text-sm text-stone-500 mb-3">
                            {type.description}
                          </p>
                          <ul className="space-y-1">
                            {type.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-stone-600"
                              >
                                <Check
                                  className={`w-4 h-4 ${
                                    formData.accountType === type.id
                                      ? "text-forest-600"
                                      : "text-stone-400"
                                  }`}
                                  strokeWidth={1.5}
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.accountType === type.id
                              ? "border-forest-500 bg-forest-500"
                              : "border-stone-300"
                          }`}
                        >
                          {formData.accountType === type.id && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Account Credentials */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                    Create your account
                  </h1>
                  <p className="text-stone-600">
                    Set up your login credentials
                  </p>
                </div>

                <div className="space-y-5">
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
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Password
                    </label>
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
                        placeholder="Minimum 8 characters"
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
                    {formData.password && formData.password.length < 8 && (
                      <p className="text-sm text-red-500 mt-1">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        className="pl-12"
                        required
                      />
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          Passwords do not match
                        </p>
                      )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="flex-1"
                    onClick={handleNext}
                    disabled={!canProceedStep2}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Organization Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                    Organization details
                  </h1>
                  <p className="text-stone-600">
                    Tell us about your{" "}
                    {formData.accountType === "cooperative"
                      ? "cooperative"
                      : "business"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      {formData.accountType === "cooperative"
                        ? "Cooperative Name"
                        : "Business Name"}
                    </label>
                    <div className="relative">
                      <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <Input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder={
                          formData.accountType === "cooperative"
                            ? "e.g., Benguet Farmers Cooperative"
                            : "e.g., Manila Organic Market"
                        }
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Contact Person
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <Input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+63 912 345 6789"
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Province / Region
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-500"
                      >
                        <option value="">Select province</option>
                        <option value="benguet">Benguet</option>
                        <option value="ifugao">Ifugao</option>
                        <option value="mountain-province">Mountain Province</option>
                        <option value="nueva-vizcaya">Nueva Vizcaya</option>
                        <option value="bukidnon">Bukidnon</option>
                        <option value="davao-del-sur">Davao del Sur</option>
                        <option value="cebu">Cebu</option>
                        <option value="iloilo">Iloilo</option>
                        <option value="metro-manila">Metro Manila</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
                    />
                    <label htmlFor="agreeTerms" className="text-sm text-stone-600">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-forest-700 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-forest-700 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1"
                      disabled={!canSubmit || isLoading}
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
                          Creating account...
                        </span>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-stone-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-forest-700 hover:text-forest-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 to-forest-800/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=1600&fit=crop"
          alt="Philippine farming"
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
              Start Your Journey
            </h2>
            <p className="text-white/80 max-w-sm mx-auto">
              {formData.accountType === "cooperative"
                ? "Connect with premium buyers and grow your market reach across Metro Manila."
                : formData.accountType === "business"
                ? "Access verified, quality products directly from Philippine cooperatives."
                : "Join the platform transforming Philippine agricultural trade."}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
