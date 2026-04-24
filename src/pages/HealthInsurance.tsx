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

    {/* Plan types */}
    <section className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-accent tracking-wider">CHOOSE YOUR PLAN TYPE</span>
        <h2 className="text-3xl font-extrabold text-foreground mt-2 mb-3">Plans built around your life stage</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Whether you're single, just married, raising kids, or caring for parents — there's a Livlong plan tailored for you.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { t: "Individual", d: "Solo cover for working professionals", price: "₹4,200/yr", cover: "₹5L cover", color: "bg-primary/10 text-primary" },
          { t: "Family Floater", d: "One plan for your entire family", price: "₹9,800/yr", cover: "₹10L cover", color: "bg-accent/10 text-accent" },
          { t: "Senior Citizen", d: "Tailored for parents above 60", price: "₹14,500/yr", cover: "₹7L cover", color: "bg-highlight/10 text-highlight" },
          { t: "Critical Illness", d: "Lump sum on diagnosis of 30+ diseases", price: "₹3,600/yr", cover: "₹25L cover", color: "bg-destructive/10 text-destructive" },
        ].map((p) => (
          <div key={p.t} className="bg-card border border-border rounded-2xl p-6 hover:shadow-card-hover transition-shadow">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${p.color}`}>{p.t.toUpperCase()}</span>
            <h3 className="font-bold text-foreground mt-3 mb-1">{p.t} Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.d}</p>
            <div className="text-2xl font-extrabold text-foreground">{p.price}</div>
            <div className="text-xs text-muted-foreground mb-4">{p.cover}</div>
            <Link to="/" className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">Compare plans <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        ))}
      </div>
    </section>

    {/* How claims work */}
    <section className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-foreground mb-3">Claim in 4 simple steps</h2>
          <p className="text-muted-foreground">Most cashless approvals happen in under 30 minutes.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { n: "01", icon: PhoneCall, t: "Call our helpline", d: "Reach our 24x7 claims desk on 1800-123-4567" },
            { n: "02", icon: Hospital, t: "Visit network hospital", d: "Show your e-card at any of 10,000+ hospitals" },
            { n: "03", icon: FileText, t: "Submit documents", d: "We coordinate paperwork directly with the hospital" },
            { n: "04", icon: Check, t: "Cashless approval", d: "Get pre-authorisation in 30 minutes, focus on recovery" },
          ].map((s) => (
            <div key={s.n} className="bg-card border border-border rounded-2xl p-6 relative">
              <div className="text-5xl font-extrabold text-primary/10 absolute top-4 right-4">{s.n}</div>
              <div className="w-11 h-11 gradient-highlight rounded-xl flex items-center justify-center mb-3"><s.icon className="w-5 h-5 text-highlight-foreground" /></div>
              <h3 className="font-bold text-foreground mb-1">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Trust stats */}
    <section className="py-14 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon: Users, n: "2Cr+", l: "Happy customers" },
          { icon: Hospital, n: "10,000+", l: "Network hospitals" },
          { icon: IndianRupee, n: "₹5,000Cr+", l: "Claims settled" },
          { icon: Clock, n: "30 min", l: "Avg cashless approval" },
        ].map((s) => (
          <div key={s.l}>
            <s.icon className="w-7 h-7 text-accent mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-extrabold text-foreground">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-foreground text-center mb-10">What our customers say</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { n: "Rohan M.", c: "Mumbai", q: "Got my mother's bypass surgery cleared cashless in 25 minutes. Livlong's claim manager handled everything.", r: 5 },
          { n: "Priya S.", c: "Bangalore", q: "Compared 8 plans in 5 minutes and saved ₹6,400 vs my old policy. The OPD bundle is a game-changer.", r: 5 },
          { n: "Anand K.", c: "Delhi", q: "Renewed my parents' senior plan online — no medicals, no calls, no upselling. Refreshingly simple.", r: 5 },
        ].map((t) => (
          <div key={t.n} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex gap-0.5 mb-3">{[...Array(t.r)].map((_, i) => <Star key={i} className="w-4 h-4 fill-highlight text-highlight" />)}</div>
            <p className="text-sm text-foreground mb-4 italic">"{t.q}"</p>
            <div className="text-sm font-bold text-foreground">{t.n}</div>
            <div className="text-xs text-muted-foreground">{t.c}</div>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default HealthInsurance;
