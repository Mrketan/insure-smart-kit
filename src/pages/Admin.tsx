import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Users, IndianRupee, Target, Clock, ArrowRight, Phone, Mail, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore, staff } from "@/lib/leadStore";
import SEO from "@/components/SEO";

const sourceLabel: Record<string, string> = {
  hero_form: "Hero form", popup: "Popup", exit_intent: "Exit intent",
  sticky_cta: "Sticky CTA", whatsapp: "WhatsApp", calculator: "Calculator",
};

const typeIcon = { call: Phone, email: Mail, whatsapp: MessageSquare, note: Clock, status: TrendingUp, assignment: Users };

const Admin = () => {
  const leads = useMemo(() => leadStore.list(), []);

  const stats = useMemo(() => {
    const converted = leads.filter((l) => l.status === "converted");
    const revenue = converted.reduce((s, l) => s + (l.premium || 0), 0);
    const conversionRate = leads.length ? (converted.length / leads.length) * 100 : 0;
    const newToday = leads.filter((l) => Date.now() - new Date(l.createdAt).getTime() < 24 * 3600 * 1000).length;
    return { total: leads.length, converted: converted.length, revenue, conversionRate, newToday };
  }, [leads]);

  const bySource = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.source, (map.get(l.source) || 0) + 1));
    const max = Math.max(...Array.from(map.values()));
    return Array.from(map.entries()).map(([k, v]) => ({ source: k, count: v, pct: (v / max) * 100 }));
  }, [leads]);

  const byProduct = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.product, (map.get(l.product) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const recentUpdates = useMemo(() => {
    return leads.flatMap((l) => l.updates.map((u) => ({ ...u, leadId: l.id, leadName: l.name }))).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
  }, [leads]);

  const topStaff = useMemo(() => {
    return staff.map((s) => {
      const assigned = leads.filter((l) => l.assignedTo === s.id);
      const converted = assigned.filter((l) => l.status === "converted").length;
      return { ...s, assigned: assigned.length, converted };
    }).sort((a, b) => b.converted - a.converted).slice(0, 4);
  }, [leads]);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Real-time overview of leads, conversions and team performance"
      actions={
        <Link to="/admin/leads" className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2">
          View all leads <ArrowRight className="w-4 h-4" />
        </Link>
      }
    >
      <SEO title="Admin Dashboard | Livlong CRM" description="Track leads, conversions, staff performance and revenue across all insurance products." />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Leads", value: stats.total, delta: "+12%", up: true, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Converted", value: stats.converted, delta: "+8%", up: true, icon: Target, color: "text-highlight", bg: "bg-highlight/10" },
          { label: "Revenue (₹)", value: `₹${(stats.revenue / 1000).toFixed(1)}K`, delta: "+24%", up: true, icon: IndianRupee, color: "text-accent", bg: "bg-accent/10" },
          { label: "Conv. Rate", value: `${stats.conversionRate.toFixed(1)}%`, delta: "-2%", up: false, icon: TrendingUp, color: "text-urgency", bg: "bg-urgency/10" },
        ].map((k) => (
          <div key={k.label} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center`}>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${k.up ? "text-highlight" : "text-destructive"}`}>
                {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {k.delta}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-foreground">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sources */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground">Leads by source</h3>
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
          <div className="space-y-3">
            {bySource.map((s) => (
              <div key={s.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{sourceLabel[s.source] || s.source}</span>
                  <span className="text-xs font-bold text-muted-foreground">{s.count}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By product */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="text-lg font-bold text-foreground mb-5">Top products</h3>
          <div className="space-y-3">
            {byProduct.map(([prod, count], i) => (
              <div key={prod} className="flex items-center justify-between p-3 rounded-xl bg-secondary/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground truncate">{prod}</span>
                </div>
                <span className="text-sm font-extrabold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & top staff */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="text-lg font-bold text-foreground mb-5">Recent activity</h3>
          <div className="space-y-4">
            {recentUpdates.map((u) => {
              const Icon = (typeIcon as Record<string, typeof Phone>)[u.type] || Clock;
              return (
                <Link to={`/admin/leads/${u.leadId}`} key={u.id} className="flex gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground"><span className="font-semibold">{u.by}</span> · {u.message}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {u.leadName} ({u.leadId}) · {new Date(u.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground">Top performers</h3>
            <Link to="/admin/staff" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {topStaff.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-highlight">{s.converted}</div>
                  <div className="text-[10px] text-muted-foreground">/{s.assigned}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
