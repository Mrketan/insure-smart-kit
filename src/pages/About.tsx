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

      <div className="text-center">
        <Link to="/" className="inline-block gradient-highlight text-highlight-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">Get Your Free Quote</Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
