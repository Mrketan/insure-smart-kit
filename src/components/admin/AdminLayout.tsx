import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, UserCog, BarChart3, Settings, ArrowLeft, Bell, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import livlongLogo from "@/assets/livlong-logo.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/staff", label: "Staff", icon: UserCog },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const AdminLayout = ({ title, subtitle, actions, children }: Props) => (
  <div className="min-h-screen flex w-full bg-secondary/30">
    {/* Sidebar */}
    <aside className="w-64 bg-card border-r border-border flex-shrink-0 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="h-16 px-5 border-b border-border flex items-center gap-3">
        <img src={livlongLogo} alt="Livlong" className="h-8 w-auto" />
        <div>
          <div className="text-sm font-extrabold text-foreground leading-none">Livlong</div>
          <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">CRM Admin</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="!bg-primary !text-primary-foreground hover:!bg-primary"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <Link to="/" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary px-3 py-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to website
        </Link>
        <div className="mt-2 mx-3 p-3 rounded-xl gradient-primary text-primary-foreground">
          <div className="text-[10px] uppercase tracking-wider opacity-80">Logged in as</div>
          <div className="text-sm font-bold mt-0.5">Admin · Mumbai HQ</div>
        </div>
      </div>
    </aside>

    {/* Main */}
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-card border-b border-border h-16 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
        <div className="lg:hidden flex items-center gap-2">
          <img src={livlongLogo} alt="Livlong" className="h-7" />
          <span className="text-sm font-bold">CRM</span>
        </div>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search leads, staff, products…"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-secondary">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-urgency rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-8 h-8 rounded-full gradient-highlight flex items-center justify-center text-highlight-foreground text-xs font-bold">AD</div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold leading-tight">Admin User</div>
              <div className="text-[10px] text-muted-foreground">admin@livlong.in</div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="lg:hidden bg-card border-b border-border px-2 py-2 flex gap-1 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground whitespace-nowrap"
            activeClassName="!bg-primary !text-primary-foreground"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <main className="flex-1 p-4 lg:p-8">
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  </div>
);

export default AdminLayout;
