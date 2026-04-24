import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { leadStore } from "@/lib/leadStore";
import SEO from "@/components/SEO";
import { Trash2, RefreshCw, Bell, Shield, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [autoAssign, setAutoAssign] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const reset = () => {
    if (confirm("Reset all leads back to demo data? This cannot be undone.")) {
      leadStore.reset();
      toast({ title: "Leads reset", description: "Refresh the page to see demo data." });
    }
  };

  const Toggle = ({ on, onChange, label, sub }: { on: boolean; onChange: () => void; label: string; sub: string }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/60">
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "gradient-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );

  return (
    <AdminLayout title="Settings" subtitle="Workspace, notifications and data management">
      <SEO title="CRM Settings | Livlong" description="Workspace, notification and data settings." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold text-foreground">Automation</h3>
          </div>
          <div className="space-y-3">
            <Toggle on={autoAssign} onChange={() => setAutoAssign(!autoAssign)} label="Auto-assign leads by product" sub="Health → Saanvi, Motor → Rohan, etc." />
            <Toggle on={whatsappAlerts} onChange={() => setWhatsappAlerts(!whatsappAlerts)} label="WhatsApp alerts to advisors" sub="Notify staff when a lead is assigned" />
            <Toggle on={emailDigest} onChange={() => setEmailDigest(!emailDigest)} label="Daily email digest" sub="Summary at 9am IST every day" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-urgency" />
            <h3 className="text-lg font-bold text-foreground">Working hours</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Open</label>
              <input defaultValue="09:00" className="mt-1 w-full px-3 py-2 rounded-xl border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Close</label>
              <input defaultValue="20:00" className="mt-1 w-full px-3 py-2 rounded-xl border border-input bg-background text-sm" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Time zone</label>
              <input defaultValue="Asia/Kolkata (IST)" disabled className="mt-1 w-full px-3 py-2 rounded-xl border border-input bg-secondary text-sm" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Data & compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            This demo stores leads in your browser's local storage. For real CRM with role-based access, audit logs, and team accounts, connect Lovable Cloud.
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive font-semibold text-sm hover:bg-destructive/20">
              <Trash2 className="w-4 h-4" /> Reset to demo data
            </button>
            <button onClick={() => location.reload()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground font-semibold text-sm hover:bg-secondary/80">
              <RefreshCw className="w-4 h-4" /> Reload
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
