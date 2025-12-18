import { motion } from "framer-motion";
import { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  ArrowRight,
  Send,
  CheckCircle,
  Loader2,
  Leaf,
  TrendingUp,
  ShieldCheck,
  Truck,
  MessageSquare,
  Calendar,
  Sparkles,
  Store,
  HandshakeIcon,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

// Memoized FAQ item
const FAQItem = memo(function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-stone-900">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center flex-shrink-0"
          >
            <span className="text-forest-600 text-lg leading-none">+</span>
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-stone-600 leading-relaxed pt-4">{answer}</p>
        </motion.div>
      </button>
    </motion.div>
  );
});

// Partner type card
const PartnerCard = memo(function PartnerCard({ 
  icon: Icon, 
  title, 
  description, 
  benefits, 
  ctaText, 
  ctaLink,
  gradient,
  delay 
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className={`absolute inset-0 ${gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
      <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-200/50 border border-stone-100 h-full flex flex-col">
        <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{title}</h3>
        <p className="text-stone-600 mb-6 leading-relaxed">{description}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-verified-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-verified-600" strokeWidth={2} />
              </div>
              <span className="text-stone-600 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
        
        <Link to={ctaLink} onClick={() => window.scrollTo(0, 0)}>
          <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white">
            {ctaText}
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
});

// Testimonial card
const TestimonialCard = memo(function TestimonialCard({ quote, author, role, image, delay }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg shadow-stone-200/50 border border-stone-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <p className="text-stone-600 leading-relaxed mb-4 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <img src={image} alt={author} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-medium text-stone-900 text-sm">{author}</p>
          <p className="text-stone-500 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
});

const faqs = [
  {
    question: "How long does the onboarding process take?",
    answer: "For businesses, you can start browsing and ordering within 24 hours of approval. For cooperatives, the full onboarding process typically takes 3-5 business days, including verification and training.",
  },
  {
    question: "What are the requirements to join as a cooperative?",
    answer: "We welcome registered cooperatives with consistent product supply. You'll need your SEC/CDA registration, list of products, and basic documentation. Our team will guide you through every step.",
  },
  {
    question: "Is there a minimum order quantity for businesses?",
    answer: "Minimum orders vary by product and cooperative. Most products have flexible minimums suitable for small cafés to large hotel chains. You can see specific requirements on each product page.",
  },
  {
    question: "How does payment and delivery work?",
    answer: "We offer flexible payment terms including COD, bank transfer, and credit terms for verified businesses. Delivery is handled through our logistics partners with real-time tracking.",
  },
  {
    question: "What quality guarantees do you provide?",
    answer: "All products go through our verification process. We guarantee freshness, origin authenticity, and food safety compliance. If any product doesn't meet standards, we offer full refunds.",
  },
  {
    question: "Can I request specific products not listed?",
    answer: "Absolutely! We can work with our cooperative partners to source specific products. Use the contact form and tell us what you're looking for—we love special requests.",
  },
];

const testimonials = [
  {
    quote: "Taglay transformed how we source ingredients. Direct connection with farmers means fresher produce and better stories to tell our customers.",
    author: "Chef Marco Reyes",
    role: "Executive Chef, The Harvest Kitchen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Our income increased by 40% since joining Taglay. We finally have direct access to Manila's premium market without middlemen.",
    author: "Maria Santos",
    role: "President, Benguet Vegetable Coop",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The platform is incredibly easy to use. We went from discovery to first order in less than a day. Game changer for our café.",
    author: "Anna Lim",
    role: "Owner, Roots & Brew Café",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    type: "business",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", company: "", type: "business", message: "" });
    }, 4000);
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar variant="transparent" />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-700 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-teal-600 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-clay-600 rounded-full blur-3xl opacity-30" />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-forest-950/50 via-transparent to-forest-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <HandshakeIcon className="w-4 h-4 text-forest-300" strokeWidth={1.5} />
              <span className="text-sm text-forest-100 font-medium">Partner With Us</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Let's Grow
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-clay-400 to-clay-300">
                Together
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Whether you're a business seeking premium local products or a 
              cooperative ready to reach new markets—we're here to help you succeed.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#get-started">
                <Button size="lg" className="bg-white text-forest-900 hover:bg-cream-100">
                  Get Started
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </Button>
              </a>
              <a href="#faq">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/20 hover:bg-white/10"
                >
                  View FAQ
                </Button>
              </a>
            </div>
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

      {/* Partner Types Section */}
      <section id="get-started" className="py-24 px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              Choose Your Path
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              How Will You Partner With Us?
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Two paths, one mission—connecting rural excellence with urban opportunity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <PartnerCard
              icon={Building2}
              title="I'm a Business"
              description="Restaurants, cafés, hotels, and retailers looking for premium, locally-sourced products with verified origins."
              benefits={[
                "Access 50+ verified cooperatives",
                "Direct pricing, no middlemen",
                "Quality-guaranteed products",
                "Flexible payment terms",
                "Real-time order tracking",
                "Dedicated account support",
              ]}
              ctaText="Start Sourcing"
              ctaLink="/register"
              gradient="bg-linear-to-br from-forest-500 to-forest-700"
              delay={0.1}
            />
            
            <PartnerCard
              icon={Users}
              title="I'm a Cooperative"
              description="Agricultural cooperatives ready to expand market reach and connect directly with Metro Manila's premium buyers."
              benefits={[
                "Access 200+ verified businesses",
                "Fair, transparent pricing",
                "No listing fees to start",
                "Logistics support included",
                "Analytics dashboard",
                "Training and onboarding",
              ]}
              ctaText="Join as Supplier"
              ctaLink="/register"
              gradient="bg-linear-to-br from-clay-500 to-clay-600"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-clay-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
                <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
                Why Taglay
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                Built for Growth,
                <br />Designed for Trust
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                We're not just a marketplace—we're a movement to transform Philippine 
                agricultural trade. Every feature is designed to make sourcing and 
                selling simpler, fairer, and more transparent.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: ShieldCheck, label: "Verified Partners", color: "forest" },
                  { icon: Truck, label: "Reliable Logistics", color: "teal" },
                  { icon: TrendingUp, label: "Fair Pricing", color: "clay" },
                  { icon: Leaf, label: "Sustainable Sourcing", color: "verified" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.color === 'forest' ? 'bg-forest-100' :
                      item.color === 'teal' ? 'bg-teal-100' :
                      item.color === 'clay' ? 'bg-clay-100' :
                      'bg-verified-100'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.color === 'forest' ? 'text-forest-600' :
                        item.color === 'teal' ? 'text-teal-600' :
                        item.color === 'clay' ? 'text-clay-600' :
                        'text-verified-600'
                      }`} strokeWidth={1.5} />
                    </div>
                    <span className="font-medium text-stone-800">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} delay={i * 0.1} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
              Have Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Let's Talk
            </h2>
            <p className="text-lg text-stone-600 max-w-xl mx-auto">
              Have a specific question or request? Send us a message and 
              our team will get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 bg-verified-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-verified-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-stone-600 max-w-md">
                  Thank you for reaching out. Our team will review your message 
                  and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-cream-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all"
                      placeholder="Juan dela Cruz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-cream-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all"
                      placeholder="juan@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Company / Cooperative
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-cream-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all"
                      placeholder="Your organization"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      I am a... *
                    </label>
                    <select
                      name="type"
                      value={formState.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-cream-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all"
                    >
                      <option value="business">Business / Buyer</option>
                      <option value="cooperative">Cooperative / Supplier</option>
                      <option value="partner">Potential Partner</option>
                      <option value="media">Media / Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 bg-cream-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-forest-600 hover:bg-forest-700 text-white px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" strokeWidth={1.5} />
                        Send Message
                      </>
                    )}
                  </Button>
                  <p className="text-stone-500 text-sm">
                    We typically respond within 24 hours
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 text-sm font-medium rounded-full mb-6">
              <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-stone-600">
              Everything you need to know about partnering with Taglay.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-stone-600 mb-4">Still have questions?</p>
            <a href="#get-started">
              <Button variant="outline" className="border-forest-200 text-forest-700 hover:bg-forest-50">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                Schedule a Call
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer showCTA={false} />
    </div>
  );
}
