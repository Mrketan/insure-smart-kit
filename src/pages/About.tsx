import { Link } from "react-router-dom";
import { Award, Shield, Users, Heart, TrendingUp, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import heroFamily from "@/assets/hero-family.jpg";

const About = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About Livlong | India's Trusted Insurance Broker Since 2014"
      description="Learn how Livlong helps 2Cr+ Indians compare and buy the right insurance. IRDAI licensed, 50+ insurer partners, 99.2% claim settlement support."
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Livlong Insurance",
        url: "https://livlong.com",
        description: "India's trusted insurance broker platform.",
      }}
    />
    <Navbar />

    <section className="gradient-primary py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={heroFamily} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <span className="inline-block bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">ABOUT LIVLONG</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">Insurance, simplified for every Indian.</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">We're on a mission to make the right insurance accessible, affordable and transparent — for families, professionals and businesses across India.</p>
      </div>
    </section>

    <section className="py-16 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Users, n: "2Cr+", l: "Customers Served" },
          { icon: Shield, n: "50+", l: "Insurer Partners" },
          { icon: Award, n: "99.2%", l: "Claim Support Rate" },
          { icon: Heart, n: "₹5,000Cr+", l: "Cover Issued" },
          { icon: TrendingUp, n: "25%", l: "Avg. Premium Saved" },
          { icon: Globe, n: "1500+", l: "Cities Covered" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <s.icon className="w-8 h-8 text-accent mb-3" />
            <div className="text-3xl font-extrabold text-foreground">{s.n}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-3">Founded in 2014, Livlong began with a simple belief: choosing insurance shouldn't feel like decoding a contract. We built India's most transparent comparison platform, partnering with the country's top insurers to give you side-by-side clarity on every plan.</p>
          <p className="text-muted-foreground">Today, we're proud to be a leading IRDAI-licensed broker, helping millions of Indians protect what matters — without the jargon, the upselling, or the confusion.</p>
        </div>
        <div className="bg-secondary rounded-2xl p-8">
          <h3 className="font-bold text-foreground mb-4">Why people choose us</h3>
          <ul className="space-y-3 text-sm text-foreground">
            {["Unbiased advice — we work for you, not the insurer","Lifetime claim assistance, free of cost","No hidden charges, ever","Plans curated by certified IRDAI advisors","Doctor + OPD bundled with Health plans"].map((p) => (
              <li key={p} className="flex gap-2"><span className="text-accent">✓</span>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {[
          { t: "Our Mission", d: "To make insurance choice simple, transparent and unbiased for every Indian household — regardless of income, geography or literacy.", color: "bg-primary/10 text-primary" },
          { t: "Our Vision", d: "To become India's most trusted financial protection partner, serving 10 crore families by 2030 with tech-enabled, human-supported advice.", color: "bg-accent/10 text-accent" },
          { t: "Our Values", d: "Customer-first always. No jargon, no upselling, no hidden costs. We earn trust through transparency and lifetime claim assistance.", color: "bg-highlight/10 text-highlight" },
        ].map((v) => (
          <div key={v.t} className="bg-card border border-border rounded-2xl p-6">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${v.color}`}>{v.t.toUpperCase()}</span>
            <p className="text-sm text-foreground mt-4 leading-relaxed">{v.d}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3">Our journey so far</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">A decade of building India's most trusted insurance comparison platform.</p>
        <div className="relative border-l-2 border-border ml-4 md:ml-0 md:mx-auto md:max-w-2xl space-y-6 pl-6 md:pl-8">
          {[
            { y: "2014", t: "The beginning", d: "Founded in Mumbai with 3 insurer partners and a vision to simplify health insurance." },
            { y: "2017", t: "1 million customers", d: "Crossed our first million served families. Launched motor and travel verticals." },
            { y: "2020", t: "Pandemic response", d: "Helped 5 lakh+ families upgrade COVID cover within weeks. Free telemedicine launched." },
            { y: "2022", t: "OPD revolution", d: "First broker in India to bundle unlimited doctor consults with health policies." },
            { y: "2025", t: "2 crore strong", d: "Trusted by over 2 crore Indians across 1,500+ cities. AI-powered plan matching live." },
          ].map((m) => (
            <div key={m.y} className="relative">
              <div className="absolute -left-[34px] md:-left-[42px] top-1 w-4 h-4 rounded-full gradient-highlight border-4 border-background" />
              <div className="text-xs font-bold text-accent">{m.y}</div>
              <div className="font-bold text-foreground">{m.t}</div>
              <div className="text-sm text-muted-foreground">{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10">Leadership team</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "Arjun Mehta", r: "Founder & CEO", b: "Ex-McKinsey, IIM-A. 15 yrs building consumer fintech across India." },
            { n: "Dr. Sneha Iyer", r: "Chief Health Officer", b: "Practicing physician for 12 yrs. Designs Livlong's medical advisory protocols." },
            { n: "Rahul Bhatia", r: "Chief Claims Officer", b: "20 yrs in insurance. Led claims at two of India's largest health insurers." },
          ].map((p) => (
            <div key={p.n} className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-20 h-20 gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-extrabold text-primary-foreground">
                {p.n.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="font-bold text-foreground">{p.n}</div>
              <div className="text-xs text-accent font-semibold mb-2">{p.r}</div>
              <p className="text-sm text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="bg-secondary rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-6">Recognised by the industry</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { y: "2024", a: "Best InsurTech Broker", o: "ET BFSI Awards" },
            { y: "2023", a: "Customer Choice Award", o: "Outlook Money" },
            { y: "2023", a: "Top 50 Startups", o: "Forbes India" },
            { y: "2022", a: "Excellence in Claims", o: "IRDAI Recognition" },
          ].map((a) => (
            <div key={a.a} className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-bold text-accent">{a.y}</div>
              <div className="text-sm font-bold text-foreground mt-1">{a.a}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.o}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="inline-block gradient-highlight text-highlight-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">Get Your Free Quote</Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
