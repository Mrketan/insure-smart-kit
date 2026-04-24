import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import healthImg from "@/assets/health-insurance.jpg";
import lifeImg from "@/assets/life-insurance.jpg";
import carImg from "@/assets/car-insurance.jpg";
import travelImg from "@/assets/travel-insurance.jpg";

const posts = [
  { slug: "health-insurance-guide-2025", title: "The 2025 Guide: Choosing the Right Health Plan for Your Family", excerpt: "From sum insured to room-rent caps — everything Indian families should know before buying health cover.", img: healthImg, tag: "Health", date: "Apr 18, 2025", read: "6 min" },
  { slug: "term-vs-whole-life", title: "Term vs Whole Life Insurance: What works in 2025?", excerpt: "Why most financial planners now recommend pure term plans over traditional endowment policies.", img: lifeImg, tag: "Life", date: "Apr 12, 2025", read: "5 min" },
  { slug: "car-insurance-claim-tips", title: "5 Things to Do Right After a Car Accident to Speed Up Your Claim", excerpt: "A simple checklist that can save you weeks of paperwork and reduce claim rejections.", img: carImg, tag: "Motor", date: "Apr 5, 2025", read: "4 min" },
  { slug: "travel-insurance-schengen", title: "Travel Insurance for Schengen: How Much Cover Do You Really Need?", excerpt: "Embassies require €30,000 — but here's what experienced travellers actually buy.", img: travelImg, tag: "Travel", date: "Mar 28, 2025", read: "5 min" },
  { slug: "tax-saving-section-80d", title: "Save up to ₹75,000 in Tax with Section 80D — A Quick Guide", excerpt: "Health insurance premiums for self, spouse, kids and parents — how to maximise the deduction.", img: healthImg, tag: "Tax", date: "Mar 20, 2025", read: "4 min" },
  { slug: "opd-cover-worth-it", title: "Is OPD Cover Worth It? A Real-Life Math Check", excerpt: "We crunched the numbers across 5 plans to see when OPD add-ons actually pay off.", img: lifeImg, tag: "Health", date: "Mar 14, 2025", read: "7 min" },
];

const Blog = () => (
  <div className="min-h-screen bg-background">
    <SEO title="Insurance Blog | Tips, Guides & Latest News — Livlong" description="Expert insurance advice — health, life, motor, travel — and money-saving tips from India's top IRDAI-certified advisors." />
    <Navbar />

    <section className="gradient-primary py-14">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <span className="inline-block bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold mb-3">LIVLONG INSIGHTS</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">Insurance, decoded.</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto">Real advice, written by humans, backed by data — to help you make smarter cover decisions.</p>
      </div>
    </section>

    <section className="py-14 max-w-6xl mx-auto px-4">
      <article className="grid md:grid-cols-2 gap-8 items-center bg-card border border-border rounded-2xl overflow-hidden mb-12 shadow-card-hover">
        <img src={posts[0].img} alt={posts[0].title} className="w-full h-64 md:h-full object-cover" />
        <div className="p-6 md:p-8">
          <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-md mb-3"><Tag className="w-3 h-3" /> Featured</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{posts[0].title}</h2>
          <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {posts[0].date}</span>
            <span>•</span><span>{posts[0].read} read</span>
          </div>
          <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">Read article <ArrowRight className="w-4 h-4" /></button>
        </div>
      </article>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(1).map((p) => (
          <article key={p.slug} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <span className="text-xs font-bold text-accent">{p.tag.toUpperCase()}</span>
              <h3 className="font-bold text-foreground mt-1 mb-2 leading-snug line-clamp-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.date}</span><span>{p.read}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/" className="inline-block gradient-highlight text-highlight-foreground font-bold px-7 py-3 rounded-xl">Get a Free Quote</Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default Blog;
