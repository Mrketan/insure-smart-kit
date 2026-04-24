export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type LeadSource = "hero_form" | "popup" | "exit_intent" | "sticky_cta" | "whatsapp" | "calculator";

export interface Lead {
  id: string;
  name?: string;
  mobile: string;
  age?: string;
  gender?: string;
  email?: string;
  product: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

const KEY = "livlong_leads_v1";

const demoLeads: Lead[] = [
  { id: "L-1042", name: "Rahul Sharma", mobile: "9876543210", age: "32", gender: "Male", email: "rahul.s@gmail.com", product: "Health Insurance", source: "hero_form", status: "converted", notes: "Bought family floater 10L", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "L-1041", name: "Priya Mehta", mobile: "9823456712", age: "28", gender: "Female", email: "priya.mehta@yahoo.in", product: "Health Insurance", source: "popup", status: "qualified", notes: "Interested in maternity cover", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: "L-1040", name: "Amit Verma", mobile: "9988776655", age: "45", gender: "Male", product: "Life Insurance", source: "hero_form", status: "contacted", notes: "Wants 1Cr term plan", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString() },
  { id: "L-1039", name: "Neha Kapoor", mobile: "9090909090", age: "35", gender: "Female", email: "neha.k@outlook.com", product: "Car Insurance", source: "sticky_cta", status: "new", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  { id: "L-1038", name: "Suresh Iyer", mobile: "9445566778", age: "52", gender: "Male", product: "Health Insurance", source: "exit_intent", status: "qualified", notes: "Senior citizen plan", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString() },
  { id: "L-1037", name: "Anjali Singh", mobile: "9112233445", age: "30", gender: "Female", email: "anjali@gmail.com", product: "Travel Insurance", source: "whatsapp", status: "converted", notes: "Europe trip Schengen", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString() },
  { id: "L-1036", name: "Karan Patel", mobile: "9333222111", age: "27", gender: "Male", product: "Bike Insurance", source: "hero_form", status: "lost", notes: "Bought elsewhere", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString() },
  { id: "L-1035", name: "Divya Reddy", mobile: "9876501234", age: "38", gender: "Female", email: "divya.r@gmail.com", product: "Health Insurance", source: "calculator", status: "qualified", notes: "Family of 4, needs 15L cover", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString() },
  { id: "L-1034", name: "Vikram Joshi", mobile: "9778899001", age: "41", gender: "Male", product: "Home Insurance", source: "hero_form", status: "contacted", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: "L-1033", name: "Pooja Nair", mobile: "9665544332", age: "29", gender: "Female", email: "pooja.nair@gmail.com", product: "Health Insurance", source: "popup", status: "new", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString() },
  { id: "L-1032", name: "Manish Gupta", mobile: "9223344556", age: "55", gender: "Male", product: "Life Insurance", source: "exit_intent", status: "converted", notes: "Whole life policy", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  { id: "L-1031", name: "Sneha Pillai", mobile: "9888777666", age: "33", gender: "Female", email: "sneha.p@yahoo.com", product: "Health Insurance", source: "hero_form", status: "qualified", notes: "Wants OPD included", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 90).toISOString() },
];

function read(): Lead[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(demoLeads));
      return demoLeads;
    }
    return JSON.parse(raw);
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
  add(input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: LeadStatus }): Lead {
    const leads = read();
    const lead: Lead = {
      id: `L-${1043 + leads.length}`,
      status: input.status ?? "new",
      createdAt: new Date().toISOString(),
      ...input,
    };
    write([lead, ...leads]);
    return lead;
  },
  update(id: string, patch: Partial<Lead>) {
    const leads = read().map((l) => (l.id === id ? { ...l, ...patch } : l));
    write(leads);
  },
  remove(id: string) {
    write(read().filter((l) => l.id !== id));
  },
  reset() {
    localStorage.removeItem(KEY);
  },
};
