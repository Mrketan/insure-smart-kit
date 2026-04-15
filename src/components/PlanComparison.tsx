import { motion } from "framer-motion";
import { Check, X as XIcon, Star } from "lucide-react";

const allPlans = [
  {
    id: 1, name: "Health Protect Gold", insurer: "Star Health", price: 599,
    coverage: "₹10 Lakh", roomRent: "No limit", restore: "Yes", maternity: "No",
    opd: "Yes", cashless: "10,000+", rating: 4.8, badge: "Best Value",
  },
  {
    id: 2, name: "Optima Secure", insurer: "HDFC Ergo", price: 449,
    coverage: "₹5 Lakh", roomRent: "₹5,000/day", restore: "Yes", maternity: "Yes",
    opd: "No", cashless: "8,000+", rating: 4.6, badge: "Cheapest",
  },
  {
    id: 3, name: "Health Companion", insurer: "ICICI Lombard", price: 799,
    coverage: "₹25 Lakh", roomRent: "No limit", restore: "Unlimited", maternity: "Yes",
    opd: "Yes", cashless: "12,000+", rating: 4.9, badge: "Recommended",
  },
];

interface Props {
  planIds: number[];
  onClose: () => void;
}

const rows = [
  { label: "Monthly Premium", key: "price", format: (v: number) => `₹${v}/mo` },
  { label: "Coverage", key: "coverage" },
  { label: "Room Rent", key: "roomRent" },
  { label: "Restore Benefit", key: "restore" },
  { label: "Maternity", key: "maternity" },
  { label: "OPD Cover", key: "opd" },
  { label: "Cashless Hospitals", key: "cashless" },
  { label: "Rating", key: "rating" },
] as const;

const PlanComparison = ({ planIds, onClose }: Props) => {
  const selected = allPlans.filter((p) => planIds.includes(p.id));
  if (selected.length < 2) return null;

  const badgeColor = (badge?: string) => {
    if (badge === "Best Value") return "bg-primary text-primary-foreground";
    if (badge === "Cheapest") return "bg-highlight text-highlight-foreground";
    if (badge === "Recommended") return "bg-urgency text-primary-foreground";
    return "";
  };

  const YesNo = ({ val }: { val: string }) =>
    val === "Yes" || val === "Unlimited" ? (
      <span className="flex items-center gap-1 text-highlight font-semibold"><Check className="w-4 h-4" />{val}</span>
    ) : val === "No" ? (
      <span className="flex items-center gap-1 text-destructive"><XIcon className="w-4 h-4" />{val}</span>
    ) : (
      <span>{val}</span>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 bg-muted"
      id="comparison"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Compare Plans</h2>
          <button onClick={onClose} className="text-sm text-primary font-medium hover:underline">Close</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-card rounded-2xl shadow-card overflow-hidden">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm text-muted-foreground font-medium">Feature</th>
                {selected.map((p) => (
                  <th key={p.id} className="p-4 text-center">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${badgeColor(p.badge)}`}>
                      {p.badge}
                    </span>
                    <div className="font-bold text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.insurer}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                  <td className="p-4 text-sm font-medium text-foreground">{row.label}</td>
                  {selected.map((p) => {
                    const val = p[row.key as keyof typeof p];
                    return (
                      <td key={p.id} className="p-4 text-center text-sm">
                        {row.key === "price" ? (
                          <span className="font-bold text-foreground text-lg">₹{val}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                        ) : row.key === "rating" ? (
                          <span className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-urgency text-urgency" /> {val}
                          </span>
                        ) : (
                          <YesNo val={String(val)} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                {selected.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button className="gradient-highlight text-highlight-foreground font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity">
                      Buy Now
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};

export default PlanComparison;
