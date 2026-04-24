import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ChevronRight } from "lucide-react";
import { leadStore } from "@/lib/leadStore";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (dismissed || submitted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show) {
        setShow(true);
      }
    };

    // Also trigger on scroll up (mobile exit intent equivalent)
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScroll - 100 && currentScroll > 300 && !show) {
        setShow(true);
      }
      lastScroll = currentScroll;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed, submitted, show]);

  if (submitted || dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={() => { setShow(false); setDismissed(true); }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
          >
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 gradient-highlight" />

            <button
              onClick={() => { setShow(false); setDismissed(true); }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6 pt-2">
              <div className="w-16 h-16 gradient-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-highlight-foreground" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground">Wait! Don't Miss This</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Get <span className="font-bold text-accent">10% OFF</span> on your first health plan + free OPD consultation worth ₹999
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (phone) leadStore.add({ mobile: phone, product: "Health Insurance", source: "exit_intent", notes: "Exit intent: 10% off claimed" });
                setSubmitted(true);
                setShow(false);
              }}
            >
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 bg-muted text-muted-foreground text-sm rounded-l-xl border border-r-0 border-input">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 rounded-r-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Claim My Offer <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Limited time offer • No spam, we promise
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
