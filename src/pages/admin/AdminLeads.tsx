import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Search, Trash2, ChevronRight, Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore, staff, type Lead, type LeadStatus, type LeadPriority } from "@/lib/leadStore";
import SEO from "@/components/SEO";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-urgency/15 text-urgency",
  qualified: "bg-accent/15 text-accent",
  converted: "bg-highlight/15 text-highlight",
  lost: "bg-destructive/10 text-destructive",
};

const priorityStyles: Record<LeadPriority, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-urgency/15 text-urgency",
  low: "bg-muted text-muted-foreground",
};

const AdminLeads = () => {
  const [version, setVersion] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [assignFilter, setAssignFilter] = useState<string>("all");

  const leads = useMemo(() => leadStore.list(), [version]);
  const products = Array.from(new Set(leads.map((l) => l.product)));

  const filtered = leads.filter((l) => {
    const matchSearch = !search || [l.name, l.mobile, l.email, l.id, l.city].some((f) => f?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    const matchProduct = productFilter === "all" || l.product === productFilter;
    const matchAssign = assignFilter === "all" || (assignFilter === "unassigned" ? !l.assignedTo : l.assignedTo === assignFilter);
    return matchSearch && matchStatus && matchProduct && matchAssign;
  });

  const remove = (id: string) => {
    if (confirm("Delete this lead?")) {
      leadStore.remove(id);
      setVersion((v) => v + 1);
    }
  };

  const exportCSV = () => {
    const rows = [["ID", "Name", "Mobile", "Email", "City", "Product", "Source", "Status", "Priority", "Assigned", "Premium", "Created"]];
    filtered.forEach((l) => rows.push([
      l.id, l.name || "", l.mobile, l.email || "", l.city || "",
      l.product, l.source, l.status, l.priority,
      staff.find((s) => s.id === l.assignedTo)?.name || "",
      String(l.premium || ""), l.createdAt,
    ]));
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
    <AdminLayout
      title="Leads"
      subtitle={`${filtered.length} of ${leads.length} leads`}
      actions={
        <>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-secondary">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm">
            <Plus className="w-4 h-4" /> New lead
          </button>
        </>
      }
    >
      <SEO title="Manage Leads | Livlong CRM" description="Search, filter, assign and manage all insurance enquiries." />

      <div className="bg-card rounded-2xl p-4 border border-border mb-6 grid md:grid-cols-4 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, mobile, email, city, ID…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")} className="px-3 py-2.5 rounded-xl border border-input bg-background text-sm">
          <option value="all">All statuses</option>
          <option value="new">New</option><option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option><option value="converted">Converted</option><option value="lost">Lost</option>
        </select>
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-input bg-background text-sm">
          <option value="all">All products</option>
          {products.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={assignFilter} onChange={(e) => setAssignFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-input bg-background text-sm md:col-span-4">
          <option value="all">All assignments</option>
          <option value="unassigned">Unassigned</option>
          {staff.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.role}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Lead</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Priority</th>
                <th className="text-left px-4 py-3 font-semibold">Assigned</th>
                <th className="text-left px-4 py-3 font-semibold">Created</th>
                <th className="text-right px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No leads found</td></tr>}
              {filtered.map((l: Lead) => {
                const staffMember = staff.find((s) => s.id === l.assignedTo);
                return (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Link to={`/admin/leads/${l.id}`} className="block">
                        <div className="font-semibold text-foreground hover:text-primary">{l.name || "—"}</div>
                        <div className="text-xs text-muted-foreground">{l.id} · +91 {l.mobile} {l.city && `· ${l.city}`}</div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground">{l.product}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${statusStyles[l.status]}`}>{l.status}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${priorityStyles[l.priority]}`}>{l.priority}</span></td>
                    <td className="px-4 py-3">
                      {staffMember ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{staffMember.avatar}</div>
                          <div className="text-xs text-foreground font-medium">{staffMember.name}</div>
                        </div>
                      ) : <span className="text-xs text-muted-foreground italic">Unassigned</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/leads/${l.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg"><ChevronRight className="w-4 h-4" /></Link>
                        <button onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
