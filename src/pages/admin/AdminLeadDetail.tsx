import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MessageSquare, MapPin, IndianRupee, Calendar, User, Clock, Send } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore, staff, type LeadStatus, type LeadUpdate } from "@/lib/leadStore";
import SEO from "@/components/SEO";

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-primary/10 text-primary" },
  { value: "contacted", label: "Contacted", color: "bg-urgency/15 text-urgency" },
  { value: "qualified", label: "Qualified", color: "bg-accent/15 text-accent" },
  { value: "converted", label: "Converted", color: "bg-highlight/15 text-highlight" },
  { value: "lost", label: "Lost", color: "bg-destructive/10 text-destructive" },
];

const updateIcons: Record<LeadUpdate["type"], typeof Phone> = {
  call: Phone, email: Mail, whatsapp: MessageSquare, note: Clock, status: User, assignment: User,
};

const AdminLeadDetail = () => {
  const { id } = useParams();
  const [version, setVersion] = useState(0);
  const [noteType, setNoteType] = useState<LeadUpdate["type"]>("note");
  const [noteText, setNoteText] = useState("");

  const lead = useMemo(() => (id ? leadStore.get(id) : undefined), [id, version]);
  if (!lead) return <Navigate to="/admin/leads" replace />;

  const assignedStaff = staff.find((s) => s.id === lead.assignedTo);

  const setStatus = (s: LeadStatus) => { leadStore.setStatus(lead.id, s); setVersion((v) => v + 1); };
  const setAssign = (sid: string) => { leadStore.assign(lead.id, sid); setVersion((v) => v + 1); };
  const addNote = () => {
    if (!noteText.trim()) return;
    leadStore.addUpdate(lead.id, { by: "Admin", type: noteType, message: noteText.trim() });
    setNoteText("");
    setVersion((v) => v + 1);
  };

  return (
    <AdminLayout
      title={lead.name || "Lead detail"}
      subtitle={`${lead.id} · ${lead.product}`}
      actions={
        <Link to="/admin/leads" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm font-semibold hover:bg-secondary">
          <ArrowLeft className="w-4 h-4" /> Back to leads
        </Link>
      }
    >
      <SEO title={`${lead.name} | Lead detail | Livlong CRM`} description="Lead detail with timeline, status updates, and assignment." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl gradient-primary text-primary-foreground text-xl font-bold flex items-center justify-center">
                {(lead.name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-lg font-extrabold text-foreground">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.age && `${lead.age}y`} {lead.gender}</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground" /> <span className="text-foreground">+91 {lead.mobile}</span></div>
              {lead.email && <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /> <span className="text-foreground break-all">{lead.email}</span></div>}
              {lead.city && <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-muted-foreground" /> <span className="text-foreground">{lead.city}</span></div>}
              <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-muted-foreground" /> <span className="text-foreground">{new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></div>
              {lead.sumInsured && <div className="flex items-center gap-3"><IndianRupee className="w-4 h-4 text-muted-foreground" /> <span className="text-foreground">Sum insured: ₹{(lead.sumInsured / 100000).toFixed(1)}L</span></div>}
              {lead.premium && <div className="flex items-center gap-3"><IndianRupee className="w-4 h-4 text-highlight" /> <span className="text-highlight font-bold">Premium: ₹{lead.premium.toLocaleString("en-IN")}/yr</span></div>}
            </div>
            <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-2">
              <a href={`tel:+91${lead.mobile}`} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20"><Phone className="w-4 h-4" /><span className="text-[10px] font-semibold">Call</span></a>
              <a href={`https://wa.me/91${lead.mobile}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 p-2 rounded-xl bg-highlight/10 text-highlight hover:bg-highlight/20"><MessageSquare className="w-4 h-4" /><span className="text-[10px] font-semibold">WhatsApp</span></a>
              <a href={`mailto:${lead.email}`} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-accent/10 text-accent hover:bg-accent/20"><Mail className="w-4 h-4" /><span className="text-[10px] font-semibold">Email</span></a>
            </div>
          </div>

          {/* Status & assignment */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Status</div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {statusOptions.map((s) => (
                <button key={s.value} onClick={() => setStatus(s.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl capitalize transition-all ${lead.status === s.value ? `${s.color} ring-2 ring-offset-1 ring-primary/30` : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                  {s.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Assigned to</div>
            <select value={lead.assignedTo || ""} onChange={(e) => setAssign(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm">
              <option value="">— Unassigned —</option>
              {staff.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
            </select>
            {assignedStaff && (
              <div className="mt-3 p-3 rounded-xl bg-secondary/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{assignedStaff.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{assignedStaff.name}</div>
                  <div className="text-xs text-muted-foreground">{assignedStaff.email}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: notes + timeline */}
        <div className="lg:col-span-2 space-y-6">
          {lead.notes && (
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Customer notes</div>
              <p className="text-sm text-foreground leading-relaxed">{lead.notes}</p>
            </div>
          )}

          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Add update</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {(["note", "call", "email", "whatsapp"] as const).map((t) => (
                <button key={t} onClick={() => setNoteType(t)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize ${noteType === t ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={noteText} onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                placeholder={`Log a ${noteType}…`}
                className="flex-1 px-3 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <button onClick={addNote} className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2">
                <Send className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Activity timeline</div>
            {lead.updates.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No updates yet — log the first interaction above.</p>
            ) : (
              <div className="space-y-4">
                {lead.updates.map((u, i) => {
                  const Icon = updateIcons[u.type] || Clock;
                  return (
                    <div key={u.id} className="flex gap-3 relative">
                      {i < lead.updates.length - 1 && <div className="absolute left-[18px] top-10 bottom-0 w-px bg-border" />}
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 z-10">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="text-sm text-foreground"><span className="font-semibold">{u.by}</span> · <span className="text-muted-foreground capitalize text-xs">{u.type}</span></div>
                        <div className="text-sm text-foreground mt-0.5">{u.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{new Date(u.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeadDetail;
