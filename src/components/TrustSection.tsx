import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users, value: "2 Cr+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "98.7%", label: "Claim Success Rate" },
  { icon: Star, value: "4.8/5", label: "Customer Rating" },
  { icon: ThumbsUp, value: "50+", label: "Insurance Partners" },
];

const reviews = [
  { name: "Priya S.", rating: 5, text: "Saved ₹8,000 on my family plan. The comparison tool made it so easy!", city: "Mumbai" },
  { name: "Rajesh K.", rating: 5, text: "Claim was settled in just 3 days. Best insurance experience ever.", city: "Delhi" },
  { name: "Anitha M.", rating: 4, text: "Love the doctor + insurance bundle. One platform for everything!", city: "Bangalore" },
];

const TrustSection = () => (
  <section className="py-12 md:py-16 bg-card">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trusted by Millions of Indians</h2>
        <p className="text-muted-foreground mt-2">India's fastest growing health platform</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="gradient-primary rounded-2xl p-5 text-center"
          >
            <s.icon className="w-8 h-8 text-highlight mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary-foreground">{s.value}</div>
            <div className="text-sm text-primary-foreground/70">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background rounded-2xl p-6 shadow-card"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-urgency text-urgency" />
              ))}
            </div>
            <p className="text-foreground text-sm mb-4">"{r.text}"</p>
            <div className="text-sm font-semibold text-foreground">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.city}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
