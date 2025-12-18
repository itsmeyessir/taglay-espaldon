import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MarketplaceContent from "@/components/marketplace/MarketplaceContent";

export default function SourcingPage() {
  return (
    <DashboardLayout>
      <MarketplaceContent
        header={
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
              Sourcing Hub
            </h1>
            <p className="text-stone-600">
              Browse and procure products directly from our partner farmers
            </p>
          </motion.div>
        }
      />
    </DashboardLayout>
  );
}
