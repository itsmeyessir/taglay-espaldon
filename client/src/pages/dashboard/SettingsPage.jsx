import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Building2,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Shield,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Parse name into first/last for display if possible
  const nameParts = user?.name ? user.name.split(' ') : ["", ""];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "";

  const [profileData, setProfileData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || "",
    phone: "", // Not in user model yet
    role: user?.role || "",
  });

  // Update local state when user context loads
  useEffect(() => {
    if (user) {
      const parts = user.name.split(' ');
      setProfileData({
        firstName: parts[0],
        lastName: parts.length > 1 ? parts.slice(1).join(' ') : "",
        email: user.email,
        phone: "", 
        role: user.role,
      });
    }
  }, [user]);

  const [businessData, setBusinessData] = useState({
    companyName: user?.role === 'farmer' ? user.name : "",
    industry: "",
    address: "",
    website: "",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newProducts: true,
    promotions: false,
    newsletter: true,
    sms: false,
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          Settings
        </h1>
        <p className="text-stone-600">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="flex gap-8">
        {/* Sidebar Tabs */}
        <div className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-forest-900 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                <tab.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-stone-200/60 p-6"
                >
                  <h2 className="text-xl font-semibold text-stone-900 mb-6">
                    Personal Information
                  </h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-forest-100 flex items-center justify-center">
                        <span className="text-3xl font-serif font-bold text-forest-700">
                          {profileData.firstName[0]}{profileData.lastName[0]}
                        </span>
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-forest-900 text-white rounded-full shadow-lg hover:bg-forest-800">
                        <Camera className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-stone-500 capitalize">{profileData.role}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        First Name
                      </label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled // Disabled for prototype as we lack update API
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Last Name
                      </label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="pl-12"
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="pl-12"
                          placeholder="Not set"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button disabled>
                      <Save className="w-4 h-4" strokeWidth={1.5} />
                      Save Changes
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Business Tab */}
              {activeTab === "business" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-stone-200/60 p-6"
                >
                  <h2 className="text-xl font-semibold text-stone-900 mb-6">
                    Business Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                        <Input
                          value={businessData.companyName}
                          onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                          className="pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Industry
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20">
                        <option>Food & Beverage</option>
                        <option>Retail</option>
                        <option>Manufacturing</option>
                        <option>Hospitality</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Business Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                        <Input
                          value={businessData.address}
                          onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                          className="pl-12"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
                        <Input
                          value={businessData.website}
                          onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                          className="pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button>
                      <Save className="w-4 h-4" strokeWidth={1.5} />
                      Save Changes
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-stone-200/60 p-6"
                >
                  <h2 className="text-xl font-semibold text-stone-900 mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    {[
                      { key: "orderUpdates", label: "Order Updates", desc: "Get notified about order status changes" },
                      { key: "newProducts", label: "New Products", desc: "Alerts when cooperatives add new products" },
                      { key: "promotions", label: "Promotions", desc: "Special offers and discounts" },
                      { key: "newsletter", label: "Newsletter", desc: "Weekly digest of marketplace updates" },
                      { key: "sms", label: "SMS Notifications", desc: "Receive text messages for urgent updates" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0">
                        <div>
                          <p className="font-medium text-stone-900">{item.label}</p>
                          <p className="text-sm text-stone-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? "bg-forest-600" : "bg-stone-200"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              notifications[item.key] ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
                    <h2 className="text-xl font-semibold text-stone-900 mb-6">
                      Change Password
                    </h2>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Current Password
                        </label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          New Password
                        </label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Confirm New Password
                        </label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-forest-100 rounded-xl">
                        <Shield className="w-6 h-6 text-forest-700" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-stone-500 mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="secondary">Enable 2FA</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-stone-200/60 p-6"
                >
                  <h2 className="text-xl font-semibold text-stone-900 mb-6">
                    Payment Methods
                  </h2>

                  <div className="space-y-4 mb-8">
                    <p className="text-stone-500 text-sm italic">No payment methods added yet.</p>
                  </div>

                  <Button variant="secondary">
                    <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                    Add Payment Method
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
    </DashboardLayout>
  );
}
