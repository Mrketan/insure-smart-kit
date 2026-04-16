import { motion } from "framer-motion";
import { ClipboardList, Search, ShieldCheck, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell Us Your Needs",
    desc: "Enter age, family size & budget",
    step: "01",
  },
  {
    icon: Search,
    title: "Compare Plans",
    desc: "See 100+ plans from top insurers",
    step: "02",
  },
  {
    icon: ShieldCheck,
    title: "Pick the Best Plan",
    desc: "Select the right coverage & price",
    step: "03",
  },
  {
    icon: ThumbsUp,
    title: "Buy Instantly",
    desc: "Secure checkout & instant policy",
    step: "04",
  },
];

const HowItWorks = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
          How It Works
        </h2>
        <p className="text-muted-foreground mt-2">
          Get insured in 4 simple steps
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-highlight to-primary opacity-20" />

        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center relative"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 relative z-10">
              <s.icon className="w-7 h-7 text-highlight" />
            </div>
            <span className="text-xs font-bold text-highlight mb-1 block">
              STEP {s.step}
            </span>
            <h3 className="font-bold text-foreground text-sm md:text-base mb-1">
              {s.title}
            </h3>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
