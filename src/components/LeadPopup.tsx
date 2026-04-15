import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";

const LeadPopup = () => {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (submitted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative"
          >
            <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Get a Free Quote!</h3>
              <p className="text-sm text-muted-foreground mt-1">Our expert will call you in 30 seconds</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                setShow(false);
              }}
            >
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 bg-muted text-muted-foreground text-sm rounded-l-xl border border-r-0 border-input">+91</span>
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
                className="w-full gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Free Quote
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
