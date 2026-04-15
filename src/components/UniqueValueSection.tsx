import { motion } from "framer-motion";
import { Stethoscope, Shield, Pill, HeartPulse } from "lucide-react";

const features = [
  { icon: Shield, title: "Health Insurance", desc: "Compare 100+ plans from top insurers" },
  { icon: Stethoscope, title: "Doctor Consultations", desc: "Unlimited online & in-person visits" },
  { icon: Pill, title: "OPD Coverage", desc: "Medicines, diagnostics, and more" },
  { icon: HeartPulse, title: "Wellness Programs", desc: "Preventive care & health tracking" },
];

const UniqueValueSection = () => (
  <section className="py-12 md:py-16 bg-muted">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-block gradient-highlight text-highlight-foreground text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          Only on Livlong
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Insurance + Doctor + OPD<br />
          <span className="text-primary">All in One Plan</span>
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          No other platform gives you complete healthcare coverage. Save more, stress less.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow text-center"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-6 h-6 text-highlight" />
            </div>
            <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UniqueValueSection;
