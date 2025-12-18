import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 404 Visual */}
        <div className="mb-8">
          <span className="text-9xl font-serif font-bold text-forest-200">404</span>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-stone-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg">
              <Home className="w-4 h-4" strokeWidth={1.5} />
              Go Home
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
