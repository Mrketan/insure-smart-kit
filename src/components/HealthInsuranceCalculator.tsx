import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, MapPin, Shield, ChevronRight, ChevronLeft, TrendingDown, Heart } from "lucide-react";

interface CalculatorResult {
  estimatedPremium: number;
  recommendedCoverage: number;
  savingsPotential: number;
}

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Other"];
const coverageOptions = [
  { value: 300000, label: "₹3 Lakh" },
  { value: 500000, label: "₹5 Lakh" },
  { value: 1000000, label: "₹10 Lakh" },
  { value: 2500000, label: "₹25 Lakh" },
  { value: 5000000, label: "₹50 Lakh" },
  { value: 10000000, label: "₹1 Crore" },
];

const calculatePremium = (age: number, members: number, coverage: number, city: string): CalculatorResult => {
  let basePremium = 4000;
  // Age factor
  if (age < 25) basePremium *= 0.7;
  else if (age < 35) basePremium *= 1;
  else if (age < 45) basePremium *= 1.4;
  else if (age < 55) basePremium *= 2;
  else basePremium *= 2.8;

  // Members factor
  basePremium *= (1 + (members - 1) * 0.6);

  // Coverage factor
  basePremium *= (coverage / 500000);

  // City factor
  const metroMultiplier = ["Mumbai", "Delhi", "Bangalore"].includes(city) ? 1.15 : 1;
  basePremium *= metroMultiplier;

  const estimatedPremium = Math.round(basePremium / 12) * 12;
  const recommendedCoverage = age < 35 ? 1000000 : age < 50 ? 2500000 : 5000000;
  const savingsPotential = Math.round(estimatedPremium * 0.25);

  return { estimatedPremium, recommendedCoverage, savingsPotential };
};

const HealthInsuranceCalculator = () => {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState("");
  const [members, setMembers] = useState("1");
  const [city, setCity] = useState("");
  const [coverage, setCoverage] = useState(500000);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleCalculate = () => {
    const res = calculatePremium(Number(age), Number(members), coverage, city);
    setResult(res);
    setStep(4);
  };

  const steps = [
    { title: "Your Age", icon: Heart },
    { title: "Family Members", icon: Users },
    { title: "Your City", icon: MapPin },
    { title: "Coverage Amount", icon: Shield },
  ];

  const canProceed = () => {
    if (step === 0) return age && Number(age) > 0 && Number(age) < 100;
    if (step === 1) return members && Number(members) > 0;
    if (step === 2) return city;
    if (step === 3) return coverage > 0;
    return false;
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Health Insurance Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Find Your Ideal Premium
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Answer 4 quick questions to get your estimated premium, recommended coverage, and potential savings.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-card-hover p-6 md:p-10">
          {/* Progress */}
          {step < 4 && (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
                  <p className={`text-xs mt-1.5 font-medium hidden md:block ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                    {s.title}
                  </p>
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="age" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label className="block text-lg font-bold text-foreground mb-2">What's your age?</label>
                <p className="text-muted-foreground text-sm mb-4">This helps us estimate the right premium for you.</p>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full max-w-xs px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="members" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label className="block text-lg font-bold text-foreground mb-2">How many family members?</label>
                <p className="text-muted-foreground text-sm mb-4">Include yourself and dependents.</p>
                <div className="flex gap-3 flex-wrap">
                  {["1", "2", "3", "4", "5", "6+"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMembers(m === "6+" ? "6" : m)}
                      className={`px-6 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        members === (m === "6+" ? "6" : m)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="city" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label className="block text-lg font-bold text-foreground mb-2">Which city do you live in?</label>
                <p className="text-muted-foreground text-sm mb-4">Metro cities may have slightly higher premiums.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        city === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="coverage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label className="block text-lg font-bold text-foreground mb-2">Select coverage amount</label>
                <p className="text-muted-foreground text-sm mb-4">Higher coverage = better protection.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {coverageOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCoverage(opt.value)}
                      className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        coverage === opt.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-extrabold text-foreground mb-1">Your Estimated Plan</h3>
                  <p className="text-muted-foreground text-sm">Based on your inputs</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-secondary rounded-xl p-5 text-center">
                    <Calculator className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Estimated Premium</p>
                    <p className="text-2xl font-extrabold text-foreground">{formatCurrency(result.estimatedPremium)}</p>
                    <p className="text-xs text-muted-foreground mt-1">per year</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-5 text-center">
                    <Shield className="w-6 h-6 text-highlight mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Recommended Coverage</p>
                    <p className="text-2xl font-extrabold text-foreground">{formatCurrency(result.recommendedCoverage)}</p>
                    <p className="text-xs text-muted-foreground mt-1">sum insured</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-5 text-center">
                    <TrendingDown className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Potential Savings</p>
                    <p className="text-2xl font-extrabold text-accent">{formatCurrency(result.savingsPotential)}</p>
                    <p className="text-xs text-muted-foreground mt-1">with Livlong</p>
                  </div>
                </div>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-full gradient-highlight text-highlight-foreground font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-6"
                >
                  Get Your Personalized Plan <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setStep(0); setResult(null); }}
                  className="w-full text-primary font-semibold py-3 text-sm mt-2 hover:underline"
                >
                  Recalculate
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => step === 3 ? handleCalculate() : setStep(step + 1)}
                disabled={!canProceed()}
                className="gradient-highlight text-highlight-foreground font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {step === 3 ? "Calculate" : "Next"} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthInsuranceCalculator;
