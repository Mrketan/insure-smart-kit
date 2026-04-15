import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";

const sumInsuredOptions = [
  { value: 300000, label: "₹3 Lakh" },
  { value: 500000, label: "₹5 Lakh" },
  { value: 1000000, label: "₹10 Lakh" },
  { value: 2500000, label: "₹25 Lakh" },
  { value: 5000000, label: "₹50 Lakh" },
  { value: 10000000, label: "₹1 Crore" },
];

const InstantPremiumEstimator = () => {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("Male");
  const [sumInsured, setSumInsured] = useState(500000);

  const premium = useMemo(() => {
    let base = 3500;
    if (age < 25) base *= 0.65;
    else if (age < 35) base *= 1;
    else if (age < 45) base *= 1.5;
    else if (age < 55) base *= 2.2;
    else base *= 3;

    base *= gender === "Female" ? 0.95 : 1;
    base *= sumInsured / 500000;

    return Math.round(base / 12);
  }, [age, gender, sumInsured]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-urgency/10 text-urgency px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Instant Premium Estimator
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Know Your Premium in Real-Time
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Adjust the sliders and see your estimated monthly premium update instantly.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-card-hover p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {/* Age slider */}
              <div>
                <label className="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
                  <span>Age</span>
                  <span className="text-primary font-bold text-lg">{age} years</span>
                </label>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>18</span>
                  <span>65</span>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">Gender</label>
                <div className="flex gap-3">
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        gender === g
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sum insured */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">Sum Insured</label>
                <div className="grid grid-cols-3 gap-2">
                  {sumInsuredOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSumInsured(opt.value)}
                      className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        sumInsured === opt.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <motion.div
              key={premium}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="gradient-primary rounded-2xl p-8 text-primary-foreground">
                <p className="text-sm opacity-80 mb-2">Estimated Monthly Premium</p>
                <p className="text-5xl font-extrabold mb-1">{formatCurrency(premium)}</p>
                <p className="text-sm opacity-70">per month</p>
                <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm opacity-80">Annual: {formatCurrency(premium * 12)}</p>
                </div>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-4"
              >
                Get Exact Quote <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstantPremiumEstimator;
