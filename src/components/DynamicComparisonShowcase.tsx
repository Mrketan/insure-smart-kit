import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X as XIcon,
  Star,
  Award,
  TrendingDown,
  Crown,
  Plus,
  GitCompare,
  ChevronRight,
} from "lucide-react";
import { plans, type Plan } from "@/data/plans";

const rows = [
  { label: "Monthly Premium", key: "price" as const },
  { label: "Sum Insured", key: "coverage" as const },
  { label: "Room Rent", key: "roomRent" as const },
  { label: "Restore Benefit", key: "restore" as const },
  { label: "Maternity Cover", key: "maternity" as const },
  { label: "OPD Cover", key: "opd" as const },
  { label: "Cashless Hospitals", key: "cashless" as const },
  { label: "Claim Settlement", key: "claimRatio" as const },
  { label: "Customer Rating", key: "rating" as const },
];

const DynamicComparisonShowcase = () => {
  // Pre-load 3 popular plans for instant comparison
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const selected = useMemo(
    () => plans.filter((p) => selectedIds.includes(p.id)),
    [selectedIds]
  );

  const removePlan = (id: number) => {
    if (selectedIds.length <= 2) return;
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const addPlan = (id: number) => {
    if (selectedIds.length >= 3) return;
    setSelectedIds((prev) => [...prev, id]);
    setPickerOpen(false);
  };

  // Dynamic winners
  const cheapestId = selected.reduce((a, b) => (a.price < b.price ? a : b)).id;
  const bestCoverageId = selected.reduce((a, b) =>
    a.coverageAmount > b.coverageAmount ? a : b
  ).id;
  const topRatedId = selected.reduce((a, b) => (a.rating > b.rating ? a : b)).id;

  const winnerFor = (key: typeof rows[number]["key"], plan: Plan) => {
    if (key === "price") return plan.id === cheapestId;
    if (key === "coverage") return plan.id === bestCoverageId;
    if (key === "rating") return plan.id === topRatedId;
    if (key === "cashless") {
      const max = Math.max(
        ...selected.map((p) => parseInt(p.cashless.replace(/\D/g, "")) || 0)
      );
      return parseInt(plan.cashless.replace(/\D/g, "")) === max;
    }
    if (key === "claimRatio") {
      const max = Math.max(...selected.map((p) => parseFloat(p.claimRatio)));
      return parseFloat(plan.claimRatio) === max;
    }
    return false;
  };

  const renderCell = (plan: Plan, key: typeof rows[number]["key"]) => {
    const val = plan[key];
    const isWinner = winnerFor(key, plan);
    const wrap = (content: React.ReactNode) => (
      <div
        className={`inline-flex items-center justify-center gap-1 transition-colors ${
          isWinner ? "font-bold text-highlight" : "text-foreground"
        }`}
      >
        {content}
        {isWinner && <Award className="w-3.5 h-3.5 text-highlight shrink-0" />}
      </div>
    );

    if (key === "price")
      return wrap(
        <span className="text-lg">
          ₹{val}
          <span className="text-xs font-normal text-muted-foreground">/mo</span>
        </span>
      );
    if (key === "rating")
      return wrap(
        <>
          <Star className="w-4 h-4 fill-urgency text-urgency" />
          {val}
        </>
      );
    const sval = String(val);
    if (sval === "Yes" || sval === "Unlimited")
      return (
        <span className="inline-flex items-center gap-1 text-highlight font-semibold">
          <Check className="w-4 h-4" />
          {sval}
        </span>
      );
    if (sval === "No")
      return (
        <span className="inline-flex items-center gap-1 text-destructive">
          <XIcon className="w-4 h-4" />
          {sval}
        </span>
      );
    return wrap(<span>{sval}</span>);
  };

  const winnerBadges = (planId: number) => {
    const badges: { icon: typeof Crown; label: string; cls: string }[] = [];
    if (planId === cheapestId)
      badges.push({
        icon: TrendingDown,
        label: "Cheapest",
        cls: "bg-highlight text-highlight-foreground",
      });
    if (planId === bestCoverageId)
      badges.push({
        icon: Crown,
        label: "Best Coverage",
        cls: "bg-primary text-primary-foreground",
      });
    if (
      planId === topRatedId &&
      planId !== cheapestId &&
      planId !== bestCoverageId
    )
      badges.push({
        icon: Star,
        label: "Top Rated",
        cls: "bg-urgency text-primary-foreground",
      });
    return badges;
  };

  const availableToAdd = plans.filter((p) => !selectedIds.includes(p.id));

  return (
    <section id="compare-showcase" className="py-14 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <GitCompare className="w-3.5 h-3.5" />
            Live Plan Comparison
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
            Compare Top Plans Side-by-Side
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Add or remove plans below — winners are auto-highlighted to help you
            decide instantly.
          </p>
        </motion.div>

        <div className="bg-card rounded-3xl shadow-card-hover overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              {/* Plan headers with logos */}
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-4 text-left text-xs uppercase tracking-wider text-muted-foreground font-semibold w-44">
                    Features
                  </th>
                  <AnimatePresence mode="popLayout">
                    {selected.map((p) => (
                      <motion.th
                        layout
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="p-5 text-center min-w-[200px] relative align-top"
                      >
                        {selectedIds.length > 2 && (
                          <button
                            onClick={() => removePlan(p.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                            aria-label="Remove plan"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        )}
                        <div className="flex flex-col items-center gap-2">
                          {/* Winner badges */}
                          <div className="flex flex-wrap justify-center gap-1 min-h-[20px]">
                            {winnerBadges(p.id).map((b) => (
                              <span
                                key={b.label}
                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${b.cls}`}
                              >
                                <b.icon className="w-3 h-3" />
                                {b.label}
                              </span>
                            ))}
                          </div>
                          {/* Real logo */}
                          <div className="bg-background rounded-xl p-2 w-20 h-14 flex items-center justify-center border border-border">
                            <img
                              src={p.insurerLogo}
                              alt={p.insurer}
                              loading="lazy"
                              width={120}
                              height={60}
                              className="max-h-10 w-auto object-contain"
                            />
                          </div>
                          <div className="font-bold text-foreground text-sm leading-tight mt-1">
                            {p.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {p.insurer}
                          </div>
                        </div>
                      </motion.th>
                    ))}
                  </AnimatePresence>

                  {/* Add plan column */}
                  {selectedIds.length < 3 && (
                    <th className="p-5 text-center min-w-[180px] align-top relative">
                      <div className="flex flex-col items-center justify-center gap-2 h-full min-h-[140px]">
                        <button
                          onClick={() => setPickerOpen((v) => !v)}
                          className="w-14 h-14 rounded-full border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary text-primary flex items-center justify-center transition-all"
                          aria-label="Add plan to compare"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                        <span className="text-xs font-semibold text-primary">
                          Add Plan
                        </span>
                      </div>

                      {/* Picker dropdown */}
                      <AnimatePresence>
                        {pickerOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 bg-card border border-border rounded-2xl shadow-card-hover p-2 w-64 text-left"
                          >
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold px-2 py-1.5">
                              Choose a plan to add
                            </p>
                            {availableToAdd.length === 0 && (
                              <p className="text-xs text-muted-foreground p-3 text-center">
                                All plans added
                              </p>
                            )}
                            {availableToAdd.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => addPlan(p.id)}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                              >
                                <img
                                  src={p.insurerLogo}
                                  alt=""
                                  className="w-8 h-8 object-contain shrink-0"
                                  loading="lazy"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-foreground truncate">
                                    {p.name}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground">
                                    ₹{p.price}/mo · {p.coverage}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Feature rows */}
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.key}
                    className={`border-b border-border/50 ${
                      i % 2 === 0 ? "bg-muted/20" : ""
                    }`}
                  >
                    <td className="p-4 text-sm font-medium text-foreground">
                      {row.label}
                    </td>
                    <AnimatePresence mode="popLayout">
                      {selected.map((p) => (
                        <motion.td
                          layout
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 text-center text-sm"
                        >
                          {renderCell(p, row.key)}
                        </motion.td>
                      ))}
                    </AnimatePresence>
                    {selectedIds.length < 3 && <td />}
                  </tr>
                ))}

                {/* CTA row */}
                <tr>
                  <td className="p-4" />
                  <AnimatePresence mode="popLayout">
                    {selected.map((p) => (
                      <motion.td
                        layout
                        key={p.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 text-center"
                      >
                        <button className="gradient-highlight text-highlight-foreground font-bold py-2.5 px-4 rounded-xl hover:opacity-90 transition-opacity text-sm w-full inline-flex items-center justify-center gap-1">
                          Buy Now <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.td>
                    ))}
                  </AnimatePresence>
                  {selectedIds.length < 3 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick swap chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
            Quick swap:
          </span>
          {plans.map((p) => {
            const active = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() =>
                  active
                    ? selectedIds.length > 2 && removePlan(p.id)
                    : selectedIds.length < 3 && addPlan(p.id)
                }
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input text-foreground hover:border-primary"
                }`}
              >
                {active ? "✓ " : "+ "}
                {p.insurer}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicComparisonShowcase;
