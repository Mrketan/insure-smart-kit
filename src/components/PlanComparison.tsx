import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X as XIcon, Star, Award, TrendingDown, Crown, X } from "lucide-react";
import { plans, type Plan } from "@/data/plans";

interface Props {
  planIds: number[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

const rows = [
  { label: "Monthly Premium", key: "price" as const },
  { label: "Sum Insured", key: "coverage" as const },
  { label: "Room Rent Limit", key: "roomRent" as const },
  { label: "Restore Benefit", key: "restore" as const },
  { label: "Maternity Cover", key: "maternity" as const },
  { label: "OPD Cover", key: "opd" as const },
  { label: "Cashless Hospitals", key: "cashless" as const },
  { label: "Claim Settlement", key: "claimRatio" as const },
  { label: "Customer Rating", key: "rating" as const },
];

const PlanComparison = ({ planIds, onClose, onRemove }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const selected = useMemo(
    () => plans.filter((p) => planIds.includes(p.id)),
    [planIds]
  );

  useEffect(() => {
    if (selected.length >= 2) {
      setTimeout(
        () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  }, [planIds.length, selected.length]);

  if (selected.length < 2) return null;

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
    const wrapper = (content: React.ReactNode) => (
      <div
        className={`inline-flex items-center justify-center gap-1 ${
          isWinner ? "font-bold text-highlight" : "text-foreground"
        }`}
      >
        {content}
        {isWinner && <Award className="w-3.5 h-3.5 text-highlight" />}
      </div>
    );

    if (key === "price") {
      return wrapper(
        <span className="text-lg">
          ₹{val}
          <span className="text-xs font-normal text-muted-foreground">/mo</span>
        </span>
      );
    }
    if (key === "rating") {
      return wrapper(
        <>
          <Star className="w-4 h-4 fill-urgency text-urgency" />
          {val}
        </>
      );
    }
    const sval = String(val);
    if (sval === "Yes" || sval === "Unlimited") {
      return (
        <span className="inline-flex items-center gap-1 text-highlight font-semibold">
          <Check className="w-4 h-4" />
          {sval}
        </span>
      );
    }
    if (sval === "No") {
      return (
        <span className="inline-flex items-center gap-1 text-destructive">
          <XIcon className="w-4 h-4" />
          {sval}
        </span>
      );
    }
    return wrapper(<span>{sval}</span>);
  };

  const winnerBadge = (planId: number) => {
    const badges: { icon: typeof Crown; label: string; className: string }[] = [];
    if (planId === cheapestId)
      badges.push({
        icon: TrendingDown,
        label: "Cheapest",
        className: "bg-highlight text-highlight-foreground",
      });
    if (planId === bestCoverageId)
      badges.push({
        icon: Crown,
        label: "Best Coverage",
        className: "bg-primary text-primary-foreground",
      });
    if (planId === topRatedId && planId !== cheapestId && planId !== bestCoverageId)
      badges.push({
        icon: Star,
        label: "Top Rated",
        className: "bg-urgency text-primary-foreground",
      });
    return badges;
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="py-12 md:py-16 bg-muted/40"
      id="comparison"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              Side-by-Side Comparison
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Compare {selected.length} Plans
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Winners are auto-highlighted to help you decide
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" /> Close
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-card-hover bg-card">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-xs uppercase tracking-wider text-muted-foreground font-semibold w-44">
                  Feature
                </th>
                <AnimatePresence>
                  {selected.map((p) => (
                    <motion.th
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 text-center min-w-[180px] relative"
                    >
                      <button
                        onClick={() => onRemove(p.id)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                        aria-label="Remove plan"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex flex-col items-center gap-1.5">
                        {winnerBadge(p.id).map((b) => (
                          <span
                            key={b.label}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${b.className}`}
                          >
                            <b.icon className="w-3 h-3" />
                            {b.label}
                          </span>
                        ))}
                        <div className="font-bold text-foreground text-sm mt-1">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{p.insurer}</div>
                      </div>
                    </motion.th>
                  ))}
                </AnimatePresence>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.key}
                  className={`border-b border-border/50 ${
                    i % 2 === 0 ? "bg-muted/30" : ""
                  }`}
                >
                  <td className="p-4 text-sm font-medium text-foreground">{row.label}</td>
                  <AnimatePresence>
                    {selected.map((p) => (
                      <motion.td
                        key={p.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 text-center text-sm"
                      >
                        {renderCell(p, row.key)}
                      </motion.td>
                    ))}
                  </AnimatePresence>
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                <AnimatePresence>
                  {selected.map((p) => (
                    <motion.td
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 text-center"
                    >
                      <button className="gradient-highlight text-highlight-foreground font-bold py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity text-sm w-full">
                        Buy Now
                      </button>
                    </motion.td>
                  ))}
                </AnimatePresence>
              </tr>
            </tbody>
          </table>
        </div>

        {selected.length < 3 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            💡 Tip: Add up to {3 - selected.length} more plan
            {3 - selected.length > 1 ? "s" : ""} to compare side-by-side
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default PlanComparison;
