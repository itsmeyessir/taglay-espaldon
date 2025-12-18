import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Leaf,
  Users,
  TrendingUp,
  Heart,
  MapPin,
  Award,
  Handshake,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

const stats = [
  { value: "50+", label: "Partner Cooperatives", icon: Users },
  { value: "200+", label: "Metro Manila Businesses", icon: TrendingUp },
  { value: "₱12M+", label: "Transactions Facilitated", icon: Sparkles },
  { value: "15", label: "Provinces Reached", icon: MapPin },
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe in empowering rural communities by giving them direct access to urban markets, ensuring fair prices and sustainable livelihoods.",
    color: "clay",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Every transaction supports environmentally conscious farming practices and helps preserve traditional agricultural methods.",
    color: "forest",
  },
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Complete supply chain visibility from farm to table, with verified origins and quality certifications you can trust.",
    color: "teal",
  },
  {
    icon: TrendingUp,
    title: "Growth Together",
    description:
      "We grow when our partners grow. Our success is measured by the prosperity we bring to cooperatives and businesses alike.",
    color: "verified",
  },
];

const team = [
  {
    name: "Andrew Fat",
    role: "Founder & CEO",
    image: "/images/team/adoy.jpeg",
    bio: "Former agricultural economist with 15 years of experience in rural development.",
  },
  {
    name: "Angelo Basilio",
    role: "Chief Operations Officer",
    image: "/images/team/gelo.jpeg",
    bio: "Supply chain expert who previously led logistics for major retail chains.",
  },
  {
    name: "Dhan Tamparong",
    role: "Head of Partnerships",
    image: "/images/team/dhan.jpeg",
    bio: "Built cooperative networks across Visayas and Mindanao for 10 years.",
  },
  {
    name: "Robbie Espaldon",
    role: "Chief Technology Officer",
    image: "/images/team/robbie.jpeg",
    bio: "Tech entrepreneur passionate about using technology for social good.",
  },
];

const milestones = [
  { year: "2021", event: "Taglay founded in Manila with a vision to connect rural and urban Philippines" },
  { year: "2022", event: "First 10 cooperatives onboarded from Benguet and Ifugao" },
  { year: "2023", event: "Expanded to Visayas region, reached ₱5M in transactions" },
  { year: "2024", event: "Launched quality verification program and analytics dashboard" },
  { year: "2025", event: "50+ cooperatives, 200+ businesses, and growing stronger" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar variant="transparent" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-700 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-clay-600 rounded-full blur-3xl opacity-40" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-600 rounded-full blur-3xl opacity-20" />
          </div>
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&auto=format&fit=crop&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-forest-950/50 via-transparent to-forest-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <Leaf className="w-4 h-4 text-forest-300" strokeWidth={1.5} />
              <span className="text-sm text-forest-100 font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Bridging Rural Roots
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-clay-400 to-clay-300">
                to Urban Tables
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Taglay—Filipino for "to carry" or "to bear"—embodies our mission to 
              carry the rich agricultural heritage of Philippine rural communities 
              to the bustling businesses of Metro Manila.
            </p>
          </motion.div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-cream-50"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-stone-200/50 border border-stone-100 hover:shadow-2xl hover:shadow-forest-900/10 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
                  <stat.icon className="w-5 h-5 text-forest-600" strokeWidth={1.5} />
                </div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-forest-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-stone-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
                <Handshake className="w-4 h-4" strokeWidth={1.5} />
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                Transforming Agricultural Trade
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                We are on a mission to transform how Philippine agricultural products 
                reach urban markets. For too long, rural cooperatives have struggled 
                with middlemen, unfair pricing, and limited access to premium buyers.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Taglay creates direct connections between cooperatives and businesses, 
                ensuring farmers receive fair compensation while businesses access 
                the finest locally-sourced products with complete transparency.
              </p>
              <div className="flex items-center gap-3 p-4 bg-forest-50 rounded-xl">
                <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-forest-700" strokeWidth={1.5} />
                </div>
                <span className="text-forest-800 font-medium">Serving all regions of the Philippines</span>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop"
                  alt="Philippine rice terraces"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                className="absolute -bottom-8 -left-8 bg-linear-to-br from-clay-500 to-clay-600 text-white p-6 rounded-2xl max-w-xs shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <Award className="w-8 h-8 mb-3 text-white/80" strokeWidth={1.5} />
                <p className="text-sm font-medium leading-relaxed">
                  "Taglay helped us increase our income by 40% by connecting us 
                  directly with Manila restaurants."
                </p>
                <p className="text-xs text-white/70 mt-3 font-medium">
                  — Benguet Vegetable Cooperative
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-clay-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              These principles guide everything we do at Taglay, from how we 
              onboard cooperatives to how we support our business partners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group relative bg-cream-50 rounded-3xl p-8 border border-stone-200/50 hover:border-forest-200 hover:shadow-xl hover:shadow-forest-900/5 transition-all duration-300 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    value.color === 'clay' ? 'bg-clay-100 group-hover:bg-clay-200' : 
                    value.color === 'forest' ? 'bg-forest-100 group-hover:bg-forest-200' : 
                    value.color === 'teal' ? 'bg-teal-100 group-hover:bg-teal-200' : 
                    'bg-verified-100 group-hover:bg-verified-200'
                  }`}>
                    <value.icon className={`w-7 h-7 ${
                      value.color === 'clay' ? 'text-clay-600' : 
                      value.color === 'forest' ? 'text-forest-600' : 
                      value.color === 'teal' ? 'text-teal-600' : 
                      'text-verified-600'
                    }`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
              Our Progress
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-stone-600">
              From a small idea to a growing platform transforming agricultural trade.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-forest-200 via-forest-300 to-forest-200" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-8 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-6 md:left-1/2 w-4 h-4 -ml-2 bg-forest-500 rounded-full ring-4 ring-cream-50 z-10" />
                
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}>
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="inline-block px-3 py-1 bg-forest-50 text-forest-700 text-sm font-bold rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <p className="text-stone-700">{milestone.event}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <Users className="w-4 h-4" strokeWidth={1.5} />
              The People
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to bridging the gap between 
              rural producers and urban consumers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative w-40 h-40 mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden ring-4 ring-cream-100 group-hover:ring-forest-100 transition-colors shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-forest-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer showCTA={false} showAboutCTA={true} />
    </div>
  );
}
