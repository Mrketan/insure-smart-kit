import { motion } from "framer-motion";
import {
  HeartPulse,
  Shield,
  Car,
  Plane,
  Home,
  Briefcase,
  Baby,
  Bike,
} from "lucide-react";
import healthImg from "@/assets/health-insurance.jpg";
import lifeImg from "@/assets/life-insurance.jpg";
import carImg from "@/assets/car-insurance.jpg";
import travelImg from "@/assets/travel-insurance.jpg";

const categories = [
  {
    icon: HeartPulse,
    title: "Health Insurance",
    desc: "Cashless treatment at 10,000+ hospitals",
    color: "from-[hsl(191,100%,17%)] to-[hsl(191,80%,30%)]",
    plans: "120+ Plans",
    startPrice: "₹299/mo",
    image: healthImg,
  },
  {
    icon: Shield,
    title: "Life Insurance",
    desc: "Secure your family's future today",
    color: "from-[hsl(250,60%,50%)] to-[hsl(270,55%,55%)]",
    plans: "80+ Plans",
    startPrice: "₹199/mo",
    image: lifeImg,
  },
  {
    icon: Car,
    title: "Car Insurance",
    desc: "Comprehensive & third-party covers",
    color: "from-[hsl(35,95%,50%)] to-[hsl(25,90%,55%)]",
    plans: "50+ Plans",
    startPrice: "₹2,499/yr",
    image: carImg,
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    desc: "Global coverage for every trip",
    color: "from-[hsl(160,60%,40%)] to-[hsl(170,55%,48%)]",
    plans: "30+ Plans",
    startPrice: "₹149/trip",
    image: travelImg,
  },
  {
    icon: Bike,
    title: "Bike Insurance",
    desc: "Ride safe with the best coverage",
    color: "from-[hsl(340,70%,50%)] to-[hsl(350,65%,55%)]",
    plans: "40+ Plans",
    startPrice: "₹999/yr",
  },
  {
    icon: Home,
    title: "Home Insurance",
    desc: "Protect your home & belongings",
    color: "from-[hsl(210,60%,50%)] to-[hsl(220,55%,55%)]",
    plans: "25+ Plans",
    startPrice: "₹1,999/yr",
  },
  {
    icon: Briefcase,
    title: "Business Insurance",
    desc: "Liability, fire & employee covers",
    color: "from-[hsl(280,50%,50%)] to-[hsl(290,45%,55%)]",
    plans: "35+ Plans",
    startPrice: "₹4,999/yr",
  },
  {
    icon: Baby,
    title: "Family Floater",
    desc: "One plan for the whole family",
    color: "from-[hsl(75,73%,43%)] to-[hsl(85,65%,50%)]",
    plans: "60+ Plans",
    startPrice: "₹499/mo",
  },
];

const InsuranceCategories = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block gradient-highlight text-highlight-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          All Insurance Types
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
          One Platform, Every Insurance
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Compare plans from 50+ top insurers. Get the best price guaranteed.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1 relative overflow-hidden flex flex-col"
          >
            {/* Image header (or gradient fallback) */}
            {cat.image ? (
              <div className="relative h-32 md:h-36 overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                  <cat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            ) : (
              <div className={`h-32 md:h-36 bg-gradient-to-br ${cat.color} flex items-center justify-center relative`}>
                <cat.icon className="w-14 h-14 text-primary-foreground/90" />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">

            <h3 className="font-bold text-foreground text-sm md:text-base mb-1">
              {cat.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {cat.desc}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs font-semibold text-primary">
                {cat.plans}
              </span>
              <span className="text-xs font-bold text-highlight">
                {cat.startPrice}
              </span>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl border-2 border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:border-primary">
              Get Quotes →
            </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default InsuranceCategories;
