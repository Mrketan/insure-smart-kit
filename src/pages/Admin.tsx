import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Search, Trash2, Users, TrendingUp, CheckCircle2, Clock, Shield } from "lucide-react";
import { leadStore, type Lead, type LeadStatus } from "@/lib/leadStore";
import SEO from "@/components/SEO";
import livlongLogo from "@/assets/livlong-logo.png";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-urgency/15 text-urgency",
  qualified: "bg-accent/15 text-accent",
  converted: "bg-highlight/15 text-highlight",
  lost: "bg-destructive/10 text-destructive",
};

const Admin = () => {
  const [version, setVersion] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [productFilter, setProductFilter] = useState<string>("all");

  const leads = useMemo(() => leadStore.list(), [version]);

  const filtered = leads.filter((l) => {
    const matchSearch = !search || [l.name, l.mobile, l.email, l.id].some((f) => f?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    const matchProduct = productFilter === "all" || l.product === productFilter;
    return matchSearch && matchStatus && matchProduct;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    qualified: leads.filter((l) => l.status === "qualified" || l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  const products = Array.from(new Set(leads.map((l) => l.product)));

  const updateStatus = (id: string, status: LeadStatus) => {
    leadStore.update(id, { status });
    setVersion((v) => v + 1);
  };

  const remove = (id: string) => {
    if (confirm("Delete this lead?")) {
      leadStore.remove(id);
      setVersion((v) => v + 1);
    }
  };

  const exportCSV = () => {
    const rows = [["ID", "Name", "Mobile", "Email", "Age", "Gender", "Product", "Source", "Status", "Notes", "Created"]];
    filtered.forEach((l) => rows.push([l.id, l.name || "", l.mobile, l.email || "", l.age || "", l.gender || "", l.product, l.source, l.status, l.notes || "", l.createdAt]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `livlong-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <SEO title="Admin Dashboard | Livlong Leads CRM" description="Manage insurance leads, track conversions and update statuses in the Livlong admin panel." />

      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={livlongLogo} alt="Livlong" className="h-8 w-auto" />
            <span className="text-sm font-bold text-foreground hidden sm:inline">Admin Panel</span>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Track, qualify and convert insurance enquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "New", value: stats.new, icon: Clock, color: "text-urgency", bg: "bg-urgency/10" },
            { label: "In Pipeline", value: stats.qualified, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
            { label: "Converted", value: stats.converted, icon: CheckCircle2, color: "text-highlight", bg: "bg-highlight/10" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, email, ID…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")} className="px-3 py-2.5 rounded-xl border border-input bg-background text-sm">
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-input bg-background text-sm">
            <option value="all">All products</option>
            {products.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-highlight text-highlight-foreground font-semibold text-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Lead</th>
                  <th className="text-left px-4 py-3 font-semibold">Contact</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold">Source</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Created</th>
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No leads found</td></tr>
                )}
                {filtered.map((l: Lead) => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-foreground">{l.name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{l.id} • {l.age ? `${l.age}y` : "—"} {l.gender || ""}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-foreground">+91 {l.mobile}</div>
                      {l.email && <div className="text-xs text-muted-foreground">{l.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-foreground">{l.product}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground capitalize">{l.source.replace("_", " ")}</span></td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer capitalize ${statusStyles[l.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      <div>{new Date(l.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" /> Demo dashboard — leads stored locally in browser. Connect Lovable Cloud for real CRM.
        </p>
      </main>
    </div>
  );
};

export default Admin;
