import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap } from "lucide-react";

const UrgencyBanner = () => (
  <section className="bg-urgency/10 border-y border-urgency/20 py-3">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-foreground">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-urgency" />
          <span>247 people bought plans today</span>
        </motion.div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-urgency" />
          <span>Limited time: Extra 10% off on annual plans</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-urgency" />
          <span>Only 3 slots left for free consultation</span>
        </div>
      </div>
    </div>
  </section>
);

export default UrgencyBanner;
