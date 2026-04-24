import { Link } from "react-router-dom";
import { Check, Heart, ShieldCheck, Stethoscope, Hospital, Pill, Baby, Activity, ArrowRight, Star, Users, Clock, IndianRupee, FileText, PhoneCall } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import healthImg from "@/assets/health-insurance.jpg";

const benefits = [
  { icon: Hospital, t: "Cashless Hospitalisation", d: "10,000+ network hospitals across India" },
  { icon: Stethoscope, t: "Free Doctor Consults", d: "Unlimited online & offline consults" },
  { icon: Pill, t: "OPD & Pharmacy Cover", d: "Routine checkups and meds covered" },
  { icon: Baby, t: "Maternity Benefits", d: "Pre & post natal expenses included" },
  { icon: Activity, t: "Annual Health Checkup", d: "Free preventive screening every year" },
  { icon: ShieldCheck, t: "100% Claim Support", d: "Personal claims manager assigned" },
];

const HealthInsurance = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Health Insurance Plans | Compare & Save 25% — Livlong"
      description="Compare 100+ health insurance plans from top insurers. Cashless treatment at 10,000+ hospitals, OPD, maternity & free doctor consults."
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Health Insurance",
        description: "Comprehensive health insurance plans with cashless cover.",
        brand: { "@type": "Brand", name: "Livlong" },
      }}
    />
    <Navbar />

    <section className="gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={healthImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-highlight text-highlight-foreground px-3 py-1 rounded-full text-xs font-bold mb-4">HEALTH INSURANCE</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">Health cover that works when you need it most.</h1>
          <p className="text-primary-foreground/85 text-lg mb-6">Compare 100+ plans from India's top insurers. Bundled doctor + OPD + hospitalisation in one smart plan.</p>
          <Link to="/" className="inline-flex items-center gap-2 gradient-highlight text-highlight-foreground font-bold px-7 py-3.5 rounded-xl hover:opacity-90">
            View Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="bg-card/95 backdrop-blur rounded-2xl p-6 shadow-card-hover">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-highlight" /> Starting at just</h3>
          <div className="text-5xl font-extrabold text-primary mb-1">₹7/day</div>
          <div className="text-muted-foreground text-sm mb-5">For ₹10 Lakh family floater cover</div>
          <ul className="space-y-2 text-sm">
            {["No medical test up to age 45","Tax savings up to ₹75,000 u/s 80D","Lifetime renewability","Pre-existing diseases covered after 2 yrs"].map((p) => (
              <li key={p} className="flex gap-2 text-foreground"><Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-foreground text-center mb-3">Everything you get with Livlong Health</h2>
      <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">More than just hospital cover — total health protection for you and your family.</p>
      <div className="grid md:grid-cols-3 gap-5">
        {benefits.map((b) => (
          <div key={b.t} className="bg-card border border-border rounded-2xl p-6 hover:shadow-card-hover transition-shadow">
            <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mb-3"><b.icon className="w-5 h-5 text-accent" /></div>
            <h3 className="font-bold text-foreground mb-1">{b.t}</h3>
            <p className="text-sm text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-10">Frequently asked questions</h2>
        <div className="space-y-3">
          {[
            { q: "What's covered under health insurance?", a: "Hospitalisation, daycare procedures, ambulance, pre/post hospitalisation, ICU, room rent, and more depending on the plan." },
            { q: "Can I add my parents?", a: "Yes, with a family floater or dedicated senior citizen plan. Coverage typically extends up to age 80." },
            { q: "How long does claim settlement take?", a: "Cashless claims are pre-approved in 30 minutes. Reimbursement takes 7–15 working days after document submission." },
            { q: "Is there a waiting period?", a: "Standard waiting period is 30 days for non-accidental claims, and 2–4 years for pre-existing conditions depending on the insurer." },
          ].map((f) => (
            <details key={f.q} className="bg-card border border-border rounded-xl p-5 group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-primary group-open:rotate-45 transition-transform text-2xl">+</span></summary>
              <p className="text-sm text-muted-foreground mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default HealthInsurance;
