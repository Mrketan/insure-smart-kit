import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, TrendingUp, Zap, Filter, X } from "lucide-react";
import { plans, type Plan } from "@/data/plans";

const familyTypes = ["Self", "Self + Spouse", "Family", "Parents"];
const coverageOptions = ["₹3 Lakh", "₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh"];

interface Props {
  compareIds: number[];
  onCompareChange: (ids: number[]) => void;
  onCompareOpen: (ids: number[]) => void;
}

const PlanListing = ({ compareIds, onCompareChange, onCompareOpen }: Props) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [familyType, setFamilyType] = useState("Self");
  const [coverageFilter, setCoverageFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = plans.filter(
    (p) =>
      p.price >= priceRange[0] &&
      p.price <= priceRange[1] &&
      (!coverageFilter || p.coverage === coverageFilter)
  );

  const toggleCompare = (id: number) => {
    const next = compareIds.includes(id)
      ? compareIds.filter((i) => i !== id)
      : compareIds.length < 3
      ? [...compareIds, id]
      : compareIds;
    onCompareChange(next);
  };

  const removeCompare = (id: number) =>
    onCompareChange(compareIds.filter((i) => i !== id));

  const badgeColor = (badge?: Plan["badge"]) => {
    if (badge === "Best Value") return "bg-primary text-primary-foreground";
    if (badge === "Cheapest") return "bg-highlight text-highlight-foreground";
    if (badge === "Recommended") return "bg-urgency text-primary-foreground";
    if (badge === "Most Popular") return "bg-accent text-accent-foreground";
    return "";
  };

  const selectedPlans = plans.filter((p) => compareIds.includes(p.id));

  return (
    <section id="plans" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Top Health Plans for You
            </h2>
            <p className="text-muted-foreground mt-1">
              {filtered.length} plans match your profile
            </p>
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
                      familyType === f
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-muted"
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
                      coverageFilter === c
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-muted"
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
              {filtered.map((plan, i) => {
                const isComparing = compareIds.includes(plan.id);
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-card rounded-2xl p-5 md:p-6 shadow-card hover:shadow-card-hover transition-all relative ${
                      isComparing ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {plan.badge && (
                      <span
                        className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(
                          plan.badge
                        )}`}
                      >
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
                        <div className="text-2xl font-extrabold text-foreground">
                          ₹{plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </div>
                        <div className="text-sm text-primary font-semibold">
                          {plan.coverage} cover
                        </div>
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
                        disabled={!isComparing && compareIds.length >= 3}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          isComparing
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input text-muted-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        }`}
                      >
                        {isComparing ? "✓ Added" : "+ Compare"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Compare Bar */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl"
          >
            <div className="bg-card border border-primary/20 rounded-2xl shadow-card-hover p-3 md:p-4 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                {selectedPlans.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap"
                  >
                    <span className="max-w-[100px] md:max-w-none truncate">{p.name}</span>
                    <button
                      onClick={() => removeCompare(p.id)}
                      className="hover:bg-primary/20 rounded p-0.5"
                      aria-label="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: 3 - compareIds.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="hidden md:flex items-center gap-2 border border-dashed border-muted-foreground/30 text-muted-foreground/60 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                  >
                    + Add plan
                  </div>
                ))}
              </div>
              <button
                onClick={() => onCompareOpen(compareIds)}
                disabled={compareIds.length < 2}
                className="gradient-primary text-primary-foreground font-bold px-4 md:px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                <Zap className="w-4 h-4" />
                Compare {compareIds.length >= 2 ? `(${compareIds.length})` : ""}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PlanListing;
