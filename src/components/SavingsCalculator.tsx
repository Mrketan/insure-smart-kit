import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, PiggyBank, ChevronRight } from "lucide-react";

const SavingsCalculator = () => {
  const [yearlyExpenses, setYearlyExpenses] = useState(50000);
  const [premium, setPremium] = useState(12000);

  const result = useMemo(() => {
    const totalSavings = Math.max(0, yearlyExpenses - premium);
    const roi = premium > 0 ? Math.round(((yearlyExpenses - premium) / premium) * 100) : 0;
    const fiveYearSavings = totalSavings * 5;
    return { totalSavings, roi, fiveYearSavings };
  }, [yearlyExpenses, premium]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  const savingsPercent = yearlyExpenses > 0 ? Math.min(100, Math.round((result.totalSavings / yearlyExpenses) * 100)) : 0;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <PiggyBank className="w-4 h-4" />
            Savings Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            See How Much You Save
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Compare your yearly medical expenses vs insurance premium to see instant ROI.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-card-hover p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
                  <span>Yearly Medical Expenses</span>
                  <span className="text-primary font-bold">{formatCurrency(yearlyExpenses)}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={yearlyExpenses}
                  onChange={(e) => setYearlyExpenses(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹5K</span>
                  <span>₹5L</span>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
                  <span>Insurance Premium (Yearly)</span>
                  <span className="text-primary font-bold">{formatCurrency(premium)}</span>
                </label>
                <input
                  type="range"
                  min="3000"
                  max="100000"
                  step="1000"
                  value={premium}
                  onChange={(e) => setPremium(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-highlight"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹3K</span>
                  <span>₹1L</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <motion.div
                key={result.totalSavings}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-secondary rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-2xl font-extrabold text-foreground">{formatCurrency(result.totalSavings)}</p>
                  </div>
                </div>
                {/* Savings bar */}
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${savingsPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{savingsPercent}% savings vs out-of-pocket</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="text-xl font-extrabold text-primary">{result.roi}%</p>
                </div>
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <PiggyBank className="w-5 h-5 text-highlight mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">5-Year Savings</p>
                  <p className="text-xl font-extrabold text-foreground">{formatCurrency(result.fiveYearSavings)}</p>
                </div>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Get My Plan <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
