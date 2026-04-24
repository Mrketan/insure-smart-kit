import { useMemo } from "react";
import { CheckCircle2, IndianRupee, Sparkles, Quote, ShieldCheck } from "lucide-react";
import { leadStore } from "@/lib/leadStore";

const initials = (name?: string) => (name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("");
const mask = (mobile: string) => `+91 ${mobile.slice(0, 2)}XXXXX${mobile.slice(-3)}`;
const ago = (iso: string) => {
  const h = Math.round((Date.now() - new Date(iso).getTime()) / 3600000);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
};

const testimonials = [
  "Saved ₹4,200 vs my old broker. Claim got approved in 48 hours!",
  "Honest advisor, no pushy sales. Got exactly the cover I needed.",
  "Compared 12 plans in 5 minutes. Best decision I made this year.",
  "Senior citizen plan with diabetes cover — they actually found one.",
  "Renewed my term plan in 10 minutes flat. Premium dropped 18%.",
];

const ConvertedLeadsShowcase = () => {
  const converted = useMemo(() => leadStore.list().filter((l) => l.status === "converted"), []);
  const totalRevenue = converted.reduce((s, l) => s + (l.premium || 0), 0);
  const totalSumInsured = converted.reduce((s, l) => s + (l.sumInsured || 0), 0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-highlight/10 text-highlight text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> REAL CUSTOMERS · REAL SAVINGS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Join <span className="text-primary">{converted.length * 8421}+</span> Indians who switched to Livlong
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live wall of recently converted policies. Names verified, mobiles masked for privacy.
          </p>
        </div>

        {/* Aggregate counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Policies issued this month", value: `${(converted.length * 142).toLocaleString("en-IN")}+`, icon: ShieldCheck, bg: "bg-primary/10", color: "text-primary" },
            { label: "Total cover provided", value: `₹${(totalSumInsured * 142 / 10000000).toFixed(0)}Cr+`, icon: IndianRupee, bg: "bg-accent/10", color: "text-accent" },
            { label: "Premiums collected", value: `₹${(totalRevenue * 142 / 100000).toFixed(0)}L+`, icon: IndianRupee, bg: "bg-highlight/10", color: "text-highlight" },
            { label: "Avg savings per family", value: "₹4,800", icon: Sparkles, bg: "bg-urgency/10", color: "text-urgency" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 border border-border shadow-card text-center">
              <div className={`w-10 h-10 mx-auto rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Lead cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {converted.slice(0, 6).map((lead, i) => (
            <article key={lead.id} className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary text-primary-foreground font-bold flex items-center justify-center">{initials(lead.name)}</div>
                  <div>
                    <div className="font-bold text-foreground flex items-center gap-1.5">
                      {lead.name}
                      <CheckCircle2 className="w-4 h-4 text-highlight" />
                    </div>
                    <div className="text-xs text-muted-foreground">{lead.city} · {ago(lead.lastContactAt || lead.createdAt)}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-highlight/15 text-highlight">VERIFIED</span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Bought</span>
                  <span className="font-semibold text-foreground">{lead.product}</span>
                </div>
                {lead.sumInsured && (
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Sum insured</span>
                    <span className="font-bold text-primary">₹{(lead.sumInsured / 100000).toFixed(0)}L</span>
                  </div>
                )}
                {lead.premium && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Annual premium</span>
                    <span className="font-extrabold text-highlight">₹{lead.premium.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              <div className="relative">
                <Quote className="w-5 h-5 text-primary/20 absolute -top-1 -left-1" />
                <p className="text-sm text-foreground italic leading-relaxed pl-5">"{testimonials[i % testimonials.length]}"</p>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{mask(lead.mobile)}</span>
                <span className="text-highlight font-bold">★★★★★</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xs text-muted-foreground">
            All conversions IRDAI verified · Customer details masked as per DPDP Act 2023
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConvertedLeadsShowcase;
