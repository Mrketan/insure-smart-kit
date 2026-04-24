import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { leadStore } from "@/lib/leadStore";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    leadStore.add({ name: form.name, email: form.email, mobile: form.mobile, notes: form.message, product: "General Enquiry", source: "hero_form" });
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Contact Livlong | Insurance Help, Claims & Quotes" description="Talk to Livlong's IRDAI-certified advisors. Call 1800-123-4567, WhatsApp us, or send a message — we reply in under 30 minutes." />
      <Navbar />

      <section className="gradient-primary py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">We're here to help</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">Quotes, claims, renewals, plan switches — our team replies within 30 minutes, 7 days a week.</p>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {[
          { icon: Phone, t: "Call us", v: "1800-123-4567", s: "Toll-free, Mon–Sun 8am–10pm" },
          { icon: MessageCircle, t: "WhatsApp", v: "+91 98765 43210", s: "Instant chat support" },
          { icon: Mail, t: "Email", v: "support@livlong.com", s: "Replies within 4 hours" },
        ].map((c) => (
          <div key={c.t} className="bg-card border border-border rounded-2xl p-6 text-center shadow-card">
            <div className="w-12 h-12 gradient-highlight rounded-xl flex items-center justify-center mx-auto mb-3">
              <c.icon className="w-6 h-6 text-highlight-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">{c.t}</div>
            <div className="font-bold text-foreground text-lg mt-1">{c.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.s}</div>
          </div>
        ))}
      </section>

      <section className="pb-16 max-w-3xl mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card-hover">
          <h2 className="text-2xl font-extrabold text-foreground mb-2">Send us a message</h2>
          <p className="text-sm text-muted-foreground mb-6">Tell us what you need — we'll get back to you fast.</p>

          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 gradient-highlight rounded-full flex items-center justify-center mx-auto mb-4"><Send className="w-7 h-7 text-highlight-foreground" /></div>
              <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
              <p className="text-muted-foreground text-sm mt-2">An advisor will reach out within 30 minutes.</p>
              <Link to="/" className="inline-block mt-6 text-primary font-semibold hover:underline">← Back to home</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="Mobile (+91)" className="md:col-span-2 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={4} className="md:col-span-2 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <button className="md:col-span-2 gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl hover:opacity-90">Send message</button>
            </form>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground justify-center">
          <MapPin className="w-4 h-4" /> Livlong HQ • Bandra Kurla Complex, Mumbai 400051
        </div>
      </section>

      {/* Office locations */}
      <section className="pb-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3">Visit us in person</h2>
        <p className="text-muted-foreground text-center mb-10">Walk into any of our branches — no appointment needed.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { c: "Mumbai (HQ)", a: "12th Floor, Trade Tower, BKC", p: "+91 22 4567 8900", h: "Mon–Sat, 9am–7pm" },
            { c: "Bangalore", a: "5th Floor, Prestige Sigma, MG Road", p: "+91 80 4234 5678", h: "Mon–Sat, 9am–7pm" },
            { c: "Delhi NCR", a: "Tower B, DLF Cyber City, Gurugram", p: "+91 124 678 9012", h: "Mon–Sat, 9am–7pm" },
          ].map((o) => (
            <div key={o.c} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div className="font-bold text-foreground">{o.c}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{o.a}</p>
              <div className="text-sm text-foreground"><strong>Phone:</strong> {o.p}</div>
              <div className="text-xs text-muted-foreground mt-1">{o.h}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 pt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8">Common questions</h2>
          <div className="space-y-3">
            {[
              { q: "How quickly will I get a response?", a: "Most enquiries are answered within 30 minutes during business hours. Outside business hours, expect a reply by the next working day." },
              { q: "Is the consultation really free?", a: "Yes. Our advisors are paid by Livlong, never by commissions on plans we recommend. You pay nothing for advice — ever." },
              { q: "Can I get help with an existing claim?", a: "Absolutely. Even if you didn't buy through Livlong, we offer free claim guidance. Call our helpline and our team will assist." },
              { q: "Do you serve customers outside metros?", a: "Yes — we cover 1,500+ cities across India with phone, email and WhatsApp support in 8 languages." },
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
};

export default Contact;
