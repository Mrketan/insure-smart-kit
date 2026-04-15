import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const activities = [
  { name: "Rohit from Mumbai", action: "bought Health Shield Pro", time: "2 min ago" },
  { name: "Priya from Delhi", action: "compared 3 plans", time: "4 min ago" },
  { name: "Amit from Bangalore", action: "saved ₹8,400/yr", time: "5 min ago" },
  { name: "Sneha from Pune", action: "got instant quote", time: "7 min ago" },
  { name: "Raj from Chennai", action: "bought Family Care Plus", time: "9 min ago" },
  { name: "Meera from Hyderabad", action: "enrolled 4 members", time: "11 min ago" },
];

const LiveActivityNotification = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % activities.length);
        setVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [visible]);

  const activity = activities[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 left-4 z-40 bg-card rounded-xl shadow-card-hover border border-border px-4 py-3 max-w-[280px]"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full text-muted-foreground text-xs flex items-center justify-center hover:bg-foreground hover:text-background"
          >
            ×
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{activity.name}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
              <p className="text-[10px] text-muted-foreground/70">{activity.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveActivityNotification;
