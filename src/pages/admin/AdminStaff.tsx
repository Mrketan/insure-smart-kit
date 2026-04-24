import { useMemo } from "react";
import { Mail, Award, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore, staff } from "@/lib/leadStore";
import SEO from "@/components/SEO";

const AdminStaff = () => {
  const leads = useMemo(() => leadStore.list(), []);

  const teamStats = useMemo(() => staff.map((s) => {
    const assigned = leads.filter((l) => l.assignedTo === s.id);
    const converted = assigned.filter((l) => l.status === "converted");
    const pipeline = assigned.filter((l) => ["contacted", "qualified"].includes(l.status));
    const revenue = converted.reduce((sum, l) => sum + (l.premium || 0), 0);
    const rate = assigned.length ? (converted.length / assigned.length) * 100 : 0;
    return { ...s, assigned: assigned.length, converted: converted.length, pipeline: pipeline.length, revenue, rate };
  }).sort((a, b) => b.revenue - a.revenue), [leads]);

  return (
    <AdminLayout title="Staff & assignments" subtitle="Performance overview of advisor team">
      <SEO title="Staff Performance | Livlong CRM" description="Track staff performance, assignments and conversions." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamStats.map((s, i) => (
          <div key={s.id} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className={`p-5 ${i === 0 ? "gradient-primary text-primary-foreground" : "bg-secondary/40"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${i === 0 ? "bg-primary-foreground/20 text-primary-foreground" : "gradient-primary text-primary-foreground"}`}>{s.avatar}</div>
                  <div>
                    <div className="text-base font-extrabold">{s.name}</div>
                    <div className={`text-xs ${i === 0 ? "opacity-80" : "text-muted-foreground"}`}>{s.role}</div>
                  </div>
                </div>
                {i === 0 && <div className="bg-highlight text-highlight-foreground text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1"><Award className="w-3 h-3" /> TOP</div>}
              </div>
              <div className={`flex items-center gap-1 mt-3 text-xs ${i === 0 ? "opacity-90" : "text-muted-foreground"}`}>
                <Mail className="w-3 h-3" /> {s.email}
              </div>
            </div>

            <div className="p-5 grid grid-cols-3 gap-3 border-b border-border">
              <div>
                <div className="text-xs text-muted-foreground">Assigned</div>
                <div className="text-xl font-extrabold text-foreground">{s.assigned}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Converted</div>
                <div className="text-xl font-extrabold text-highlight">{s.converted}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Pipeline</div>
                <div className="text-xl font-extrabold text-accent">{s.pipeline}</div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Conversion rate</span>
                <span className="font-bold text-foreground">{s.rate.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div className="h-full gradient-highlight" style={{ width: `${Math.min(s.rate, 100)}%` }} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-highlight/10">
                <div className="flex items-center gap-2 text-highlight">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold">Revenue closed</span>
                </div>
                <span className="text-sm font-extrabold text-highlight">₹{s.revenue.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminStaff;
