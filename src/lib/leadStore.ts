export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type LeadSource = "hero_form" | "popup" | "exit_intent" | "sticky_cta" | "whatsapp" | "calculator";
export type LeadPriority = "low" | "medium" | "high";

export interface LeadUpdate {
  id: string;
  at: string;
  by: string;
  type: "note" | "status" | "assignment" | "call" | "email" | "whatsapp";
  message: string;
}

export interface Lead {
  id: string;
  name?: string;
  mobile: string;
  age?: string;
  gender?: string;
  email?: string;
  city?: string;
  product: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  premium?: number;
  sumInsured?: number;
  notes?: string;
  updates: LeadUpdate[];
  createdAt: string;
  lastContactAt?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export const staff: StaffMember[] = [
  { id: "S-01", name: "Aarav Khanna", role: "Senior Advisor", email: "aarav@livlong.in", avatar: "AK" },
  { id: "S-02", name: "Saanvi Rao", role: "Health Specialist", email: "saanvi@livlong.in", avatar: "SR" },
  { id: "S-03", name: "Rohan Bhatt", role: "Motor Expert", email: "rohan@livlong.in", avatar: "RB" },
  { id: "S-04", name: "Isha Malhotra", role: "Life Insurance Lead", email: "isha@livlong.in", avatar: "IM" },
  { id: "S-05", name: "Dev Choudhary", role: "Travel & Misc.", email: "dev@livlong.in", avatar: "DC" },
];

const KEY = "livlong_leads_v2";

const u = (by: string, type: LeadUpdate["type"], message: string, hoursAgo = 0): LeadUpdate => ({
  id: `U-${Math.random().toString(36).slice(2, 8)}`,
  at: new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString(),
  by,
  type,
  message,
});

const demoLeads: Lead[] = [
  {
    id: "L-1042", name: "Rahul Sharma", mobile: "9876543210", age: "32", gender: "Male", email: "rahul.s@gmail.com", city: "Mumbai",
    product: "Health Insurance", source: "hero_form", status: "converted", priority: "high", assignedTo: "S-02",
    premium: 14500, sumInsured: 1000000, notes: "Bought family floater 10L from Star Health",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updates: [
      u("Saanvi Rao", "status", "Lead converted — policy issued", 2),
      u("Saanvi Rao", "call", "Confirmed payment via UPI, KYC complete", 6),
      u("Saanvi Rao", "email", "Sent comparison sheet (Star vs HDFC vs Niva)", 24),
      u("System", "assignment", "Auto-assigned to Saanvi Rao", 50),
    ],
  },
  {
    id: "L-1041", name: "Priya Mehta", mobile: "9823456712", age: "28", gender: "Female", email: "priya.mehta@yahoo.in", city: "Pune",
    product: "Health Insurance", source: "popup", status: "qualified", priority: "high", assignedTo: "S-02",
    sumInsured: 500000, notes: "Interested in maternity cover, planning a baby in 6 months",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updates: [
      u("Saanvi Rao", "whatsapp", "Sent maternity-cover plan brochures", 5),
      u("Saanvi Rao", "call", "Discussed waiting periods, prefers Niva Bupa ReAssure", 12),
      u("System", "assignment", "Assigned to Saanvi Rao (Health Specialist)", 30),
    ],
  },
  {
    id: "L-1040", name: "Amit Verma", mobile: "9988776655", age: "45", gender: "Male", city: "Delhi",
    product: "Life Insurance", source: "hero_form", status: "contacted", priority: "high", assignedTo: "S-04",
    sumInsured: 10000000, notes: "Wants 1Cr term plan, non-smoker, salaried",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    updates: [
      u("Isha Malhotra", "call", "First call done — sent HDFC Click 2 Protect quote", 9),
      u("System", "assignment", "Assigned to Isha Malhotra", 36),
    ],
  },
  {
    id: "L-1039", name: "Neha Kapoor", mobile: "9090909090", age: "35", gender: "Female", email: "neha.k@outlook.com", city: "Bengaluru",
    product: "Car Insurance", source: "sticky_cta", status: "new", priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), updates: [],
  },
  {
    id: "L-1038", name: "Suresh Iyer", mobile: "9445566778", age: "52", gender: "Male", city: "Chennai",
    product: "Health Insurance", source: "exit_intent", status: "qualified", priority: "high", assignedTo: "S-02",
    notes: "Senior citizen plan — pre-existing diabetes",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updates: [
      u("Saanvi Rao", "note", "Recommended Care Senior Shield, awaiting medical reports", 18),
      u("System", "assignment", "Assigned to Saanvi Rao", 28),
    ],
  },
  {
    id: "L-1037", name: "Anjali Singh", mobile: "9112233445", age: "30", gender: "Female", email: "anjali@gmail.com", city: "Hyderabad",
    product: "Travel Insurance", source: "whatsapp", status: "converted", priority: "medium", assignedTo: "S-05",
    premium: 2400, sumInsured: 5000000, notes: "Europe trip Schengen — 14 days",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updates: [
      u("Dev Choudhary", "status", "Policy issued — Bajaj Allianz Travel", 26),
      u("Dev Choudhary", "whatsapp", "Sent Schengen-compliant policy options", 32),
    ],
  },
  {
    id: "L-1036", name: "Karan Patel", mobile: "9333222111", age: "27", gender: "Male", city: "Ahmedabad",
    product: "Bike Insurance", source: "hero_form", status: "lost", priority: "low", assignedTo: "S-03",
    notes: "Bought elsewhere — Acko gave 12% lower",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    updates: [u("Rohan Bhatt", "note", "Lost to Acko on price", 30)],
  },
  {
    id: "L-1035", name: "Divya Reddy", mobile: "9876501234", age: "38", gender: "Female", email: "divya.r@gmail.com", city: "Bengaluru",
    product: "Health Insurance", source: "calculator", status: "qualified", priority: "high", assignedTo: "S-02",
    sumInsured: 1500000, notes: "Family of 4, needs 15L cover with OPD",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    updates: [u("Saanvi Rao", "email", "Shared 3 family floater quotes with OPD add-on", 40)],
  },
  {
    id: "L-1034", name: "Vikram Joshi", mobile: "9778899001", age: "41", gender: "Male", city: "Jaipur",
    product: "Home Insurance", source: "hero_form", status: "contacted", priority: "medium", assignedTo: "S-01",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updates: [u("Aarav Khanna", "call", "Sent ICICI Home Shield brochure", 48)],
  },
  {
    id: "L-1033", name: "Pooja Nair", mobile: "9665544332", age: "29", gender: "Female", email: "pooja.nair@gmail.com", city: "Kochi",
    product: "Health Insurance", source: "popup", status: "new", priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(), updates: [],
  },
  {
    id: "L-1032", name: "Manish Gupta", mobile: "9223344556", age: "55", gender: "Male", city: "Lucknow",
    product: "Life Insurance", source: "exit_intent", status: "converted", priority: "high", assignedTo: "S-04",
    premium: 38000, sumInsured: 5000000, notes: "Whole life policy — ICICI Pru iProtect Smart",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updates: [
      u("Isha Malhotra", "status", "Policy bound — premium paid", 72),
      u("Isha Malhotra", "call", "Medical test scheduled at home", 100),
    ],
  },
  {
    id: "L-1031", name: "Sneha Pillai", mobile: "9888777666", age: "33", gender: "Female", email: "sneha.p@yahoo.com", city: "Mumbai",
    product: "Health Insurance", source: "hero_form", status: "qualified", priority: "high", assignedTo: "S-02",
    notes: "Wants OPD included + dental",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 90).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    updates: [u("Saanvi Rao", "whatsapp", "Sent Aditya Birla Activ Health Platinum quote", 80)],
  },
  {
    id: "L-1030", name: "Arjun Nair", mobile: "9555444333", age: "29", gender: "Male", email: "arjun.n@gmail.com", city: "Bengaluru",
    product: "Health Insurance", source: "hero_form", status: "converted", priority: "high", assignedTo: "S-02",
    premium: 9800, sumInsured: 750000, notes: "Single individual — HDFC Optima Restore 7.5L",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 95).toISOString(),
    updates: [u("Saanvi Rao", "status", "Converted in 5 hours — fastest this week 🚀", 95)],
  },
  {
    id: "L-1029", name: "Meera Iyer", mobile: "9444333222", age: "44", gender: "Female", city: "Chennai",
    product: "Health Insurance", source: "calculator", status: "converted", priority: "high", assignedTo: "S-02",
    premium: 22000, sumInsured: 2000000, notes: "Family floater 20L — Niva Bupa ReAssure",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 130).toISOString(),
    lastContactAt: new Date(Date.now() - 1000 * 60 * 60 * 110).toISOString(),
    updates: [u("Saanvi Rao", "status", "Policy active — saved ₹4,200 vs market", 110)],
  },
];

function read(): Lead[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(demoLeads));
      return demoLeads;
    }
    const parsed = JSON.parse(raw) as Lead[];
    return parsed.map((l) => ({ ...l, updates: l.updates || [], priority: l.priority || "medium" }));
  } catch {
    return demoLeads;
  }
}

function write(leads: Lead[]) {
  localStorage.setItem(KEY, JSON.stringify(leads));
}

export const leadStore = {
  list(): Lead[] {
    return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  get(id: string): Lead | undefined {
    return read().find((l) => l.id === id);
  },
  add(input: Omit<Lead, "id" | "createdAt" | "status" | "updates" | "priority"> & { status?: LeadStatus; priority?: LeadPriority }): Lead {
    const leads = read();
    const lead: Lead = {
      id: `L-${1043 + leads.length}`,
      status: input.status ?? "new",
      priority: input.priority ?? "medium",
      createdAt: new Date().toISOString(),
      updates: [],
      ...input,
    };
    write([lead, ...leads]);
    return lead;
  },
  update(id: string, patch: Partial<Lead>) {
    const leads = read().map((l) => (l.id === id ? { ...l, ...patch } : l));
    write(leads);
  },
  addUpdate(id: string, update: Omit<LeadUpdate, "id" | "at">) {
    const leads = read().map((l) => {
      if (l.id !== id) return l;
      const newUpdate: LeadUpdate = {
        ...update,
        id: `U-${Math.random().toString(36).slice(2, 8)}`,
        at: new Date().toISOString(),
      };
      return { ...l, updates: [newUpdate, ...(l.updates || [])], lastContactAt: new Date().toISOString() };
    });
    write(leads);
  },
  assign(id: string, staffId: string) {
    const member = staff.find((s) => s.id === staffId);
    const leads = read().map((l) => {
      if (l.id !== id) return l;
      const newUpdate: LeadUpdate = {
        id: `U-${Math.random().toString(36).slice(2, 8)}`,
        at: new Date().toISOString(),
        by: "Admin",
        type: "assignment",
        message: `Assigned to ${member?.name || staffId}`,
      };
      return { ...l, assignedTo: staffId, updates: [newUpdate, ...(l.updates || [])] };
    });
    write(leads);
  },
  setStatus(id: string, status: LeadStatus, by = "Admin") {
    const leads = read().map((l) => {
      if (l.id !== id) return l;
      const newUpdate: LeadUpdate = {
        id: `U-${Math.random().toString(36).slice(2, 8)}`,
        at: new Date().toISOString(),
        by,
        type: "status",
        message: `Status changed to ${status}`,
      };
      return { ...l, status, updates: [newUpdate, ...(l.updates || [])] };
    });
    write(leads);
  },
  remove(id: string) {
    write(read().filter((l) => l.id !== id));
  },
  reset() {
    localStorage.removeItem(KEY);
  },
};
