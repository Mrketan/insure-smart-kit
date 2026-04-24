import { useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore } from "@/lib/leadStore";
import SEO from "@/components/SEO";
import { TrendingUp, IndianRupee, Target, Clock } from "lucide-react";

const AdminAnalytics = () => {
  const leads = useMemo(() => leadStore.list(), []);

  const funnel = useMemo(() => {
    const stages = ["new", "contacted", "qualified", "converted"] as const;
    const total = leads.length || 1;
    return stages.map((stage) => {
      const count = leads.filter((l) => {
        if (stage === "new") return true;
        if (stage === "contacted") return ["contacted", "qualified", "converted"].includes(l.status);
        if (stage === "qualified") return ["qualified", "converted"].includes(l.status);
        return l.status === "converted";
      }).length;
      return { stage, count, pct: (count / total) * 100 };
    });
  }, [leads]);

  const cityBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => l.city && map.set(l.city, (map.get(l.city) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [leads]);

  const monthlyTrend = useMemo(() => {
    const now = new Date();
    const months: { label: string; total: number; converted: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString("en-IN", { month: "short" });
      months.push({ label, total: Math.round(20 + Math.random() * 40), converted: Math.round(5 + Math.random() * 15) });
    }
    return months;
  }, []);

  const totalRevenue = leads.filter((l) => l.status === "converted").reduce((s, l) => s + (l.premium || 0), 0);

  return (
    <AdminLayout title="Analytics" subtitle="Insights across the conversion funnel">
      <SEO title="Lead Analytics | Livlong CRM" description="Conversion funnel, geography and monthly trends." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg deal size", value: `₹${Math.round(totalRevenue / Math.max(1, leads.filter((l) => l.status === "converted").length)).toLocaleString("en-IN")}`, icon: IndianRupee },
          { label: "Lead → Contacted", value: "78%", icon: Target },
          { label: "Avg response time", value: "2.4 hrs", icon: Clock },
          { label: "MoM growth", value: "+24%", icon: TrendingUp },
        ].map((k) => (
          <div key={k.label} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <k.icon className="w-5 h-5 text-primary mb-3" />
            <div className="text-2xl font-extrabold text-foreground">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="text-lg font-bold text-foreground mb-5">Conversion funnel</h3>
          <div className="space-y-4">
            {funnel.map((f, i) => (
              <div key={f.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground capitalize">{f.stage}</span>
                  <span className="text-xs font-bold text-muted-foreground">{f.count} ({f.pct.toFixed(0)}%)</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${i === 3 ? "gradient-highlight" : "gradient-primary"}`} style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="text-lg font-bold text-foreground mb-5">Top cities</h3>
          <div className="grid grid-cols-2 gap-3">
            {cityBreakdown.map(([city, count]) => (
              <div key={city} className="flex items-center justify-between p-3 rounded-xl bg-secondary/60">
                <span className="text-sm font-medium text-foreground">{city}</span>
                <span className="text-sm font-extrabold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
        <h3 className="text-lg font-bold text-foreground mb-5">Monthly trend (last 6 months)</h3>
        <div className="flex items-end gap-3 h-48">
          {monthlyTrend.map((m) => {
            const max = Math.max(...monthlyTrend.map((x) => x.total));
            return (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end gap-1 h-40">
                  <div className="flex-1 gradient-primary rounded-t-lg" style={{ height: `${(m.total / max) * 100}%` }} title={`Total: ${m.total}`} />
                  <div className="flex-1 gradient-highlight rounded-t-lg" style={{ height: `${(m.converted / max) * 100}%` }} title={`Converted: ${m.converted}`} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded gradient-primary" /> Total leads</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded gradient-highlight" /> Converted</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
