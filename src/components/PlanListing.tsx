import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, TrendingUp, Zap, Filter } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  insurer: string;
  price: number;
  coverage: string;
  benefits: string[];
  badge?: string;
  rating: number;
  bought: number;
}

const plans: Plan[] = [
  {
    id: 1, name: "Health Protect Gold", insurer: "Star Health", price: 599,
    coverage: "₹10 Lakh", benefits: ["Cashless at 10,000+ hospitals", "No room rent limit", "Free health checkup", "OPD cover included"],
    badge: "Best Value", rating: 4.8, bought: 47,
  },
  {
    id: 2, name: "Optima Secure", insurer: "HDFC Ergo", price: 449,
    coverage: "₹5 Lakh", benefits: ["Cashless at 8,000+ hospitals", "Day 1 coverage", "Maternity benefit", "Restore benefit"],
    badge: "Cheapest", rating: 4.6, bought: 32,
  },
  {
    id: 3, name: "Health Companion", insurer: "ICICI Lombard", price: 799,
    coverage: "₹25 Lakh", benefits: ["Unlimited restore", "Global coverage", "Personal health coach", "Doctor + OPD bundle"],
    badge: "Recommended", rating: 4.9, bought: 58,
  },
  {
    id: 4, name: "Arogya Sanjeevani", insurer: "Niva Bupa", price: 349,
    coverage: "₹3 Lakh", benefits: ["Standard IRDAI plan", "Cashless available", "Cataract coverage", "Ambulance cover"],
    rating: 4.3, bought: 19,
  },
  {
    id: 5, name: "Super Top-Up Plan", insurer: "Care Health", price: 299,
    coverage: "₹50 Lakh", benefits: ["Top-up on existing plan", "Very low premium", "No sub-limits", "Tax benefit u/s 80D"],
    rating: 4.5, bought: 25,
  },
];

const familyTypes = ["Self", "Self + Spouse", "Family", "Parents"];
const coverageOptions = ["₹3 Lakh", "₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh"];

interface Props {
  onCompare: (ids: number[]) => void;
}

const PlanListing = ({ onCompare }: Props) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [familyType, setFamilyType] = useState("Self");
  const [coverageFilter, setCoverageFilter] = useState("");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = plans.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1] &&
      (!coverageFilter || p.coverage === coverageFilter)
  );

  const toggleCompare = (id: number) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const badgeColor = (badge?: string) => {
    if (badge === "Best Value") return "bg-primary text-primary-foreground";
    if (badge === "Cheapest") return "bg-highlight text-highlight-foreground";
    if (badge === "Recommended") return "bg-urgency text-primary-foreground";
    return "";
  };

  return (
    <section id="plans" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Top Health Plans for You</h2>
            <p className="text-muted-foreground mt-1">{filtered.length} plans match your profile</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-input text-sm font-medium"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          {/* Filters sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} md:block space-y-6`}>
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Family Type</h3>
              <div className="space-y-2">
                {familyTypes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFamilyType(f)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      familyType === f ? "bg-primary text-primary-foreground font-medium" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Coverage</h3>
              <div className="space-y-2">
                {coverageOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCoverageFilter(coverageFilter === c ? "" : c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      coverageFilter === c ? "bg-primary text-primary-foreground font-medium" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Price Range (₹/mo)</h3>
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹0</span>
                <span>₹{priceRange[1]}/mo</span>
              </div>
            </div>
          </div>

          {/* Plan cards */}
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-5 md:p-6 shadow-card hover:shadow-card-hover transition-shadow relative"
                >
                  {plan.badge && (
                    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(plan.badge)}`}>
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.insurer}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-urgency text-urgency" />
                        <span className="text-sm font-medium">{plan.rating}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          <TrendingUp className="w-3 h-3 inline" /> {plan.bought} bought today
                        </span>
                      </div>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="text-2xl font-extrabold text-foreground">₹{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                      <div className="text-sm text-primary font-semibold">{plan.coverage} cover</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {plan.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-highlight mt-0.5 shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    <button className="flex-1 gradient-highlight text-highlight-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
                      Select Plan
                    </button>
                    <button
                      onClick={() => toggleCompare(plan.id)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        compareIds.includes(plan.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-input text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {compareIds.includes(plan.id) ? "✓ Added" : "Compare"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {compareIds.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-20 z-30"
              >
                <button
                  onClick={() => onCompare(compareIds)}
                  className="w-full gradient-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <Zap className="w-5 h-5" /> Compare {compareIds.length} Plans
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanListing;
