import { motion } from "framer-motion";

const partners = [
  { name: "Star Health", short: "STAR" },
  { name: "HDFC Ergo", short: "HDFC" },
  { name: "ICICI Lombard", short: "ICICI" },
  { name: "Niva Bupa", short: "NIVA" },
  { name: "Care Health", short: "CARE" },
  { name: "Bajaj Allianz", short: "BAJAJ" },
  { name: "Tata AIG", short: "TATA" },
  { name: "Max Bupa", short: "MAX" },
  { name: "New India", short: "NIA" },
  { name: "Reliance", short: "RGI" },
  { name: "SBI General", short: "SBI" },
  { name: "Kotak Life", short: "KOTAK" },
];

// Distinct brand-style colors for visual variety (HSL via inline style for partner branding only)
const palette = [
  "hsl(355, 78%, 45%)", // Star red
  "hsl(220, 75%, 35%)", // HDFC blue
  "hsl(25, 95%, 50%)",  // ICICI orange
  "hsl(195, 80%, 40%)", // Niva teal
  "hsl(145, 60%, 35%)", // Care green
  "hsl(220, 90%, 45%)", // Bajaj blue
  "hsl(215, 70%, 25%)", // Tata navy
  "hsl(280, 55%, 45%)", // Max purple
  "hsl(0, 75%, 45%)",   // NIA red
  "hsl(210, 80%, 40%)", // Reliance blue
  "hsl(220, 85%, 30%)", // SBI deep blue
  "hsl(5, 80%, 50%)",   // Kotak red-orange
];

const PartnersSection = () => (
  <section className="py-12 md:py-16 bg-muted/40 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-sm font-bold text-highlight uppercase tracking-wider mb-2">
          Our Partners
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
          Trusted by 50+ Top Insurance Companies
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          We compare plans from India's most trusted insurers
        </p>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-2 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 cursor-pointer min-h-[88px]"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-foreground font-extrabold text-[10px] tracking-tight shadow-sm"
              style={{ backgroundColor: palette[i % palette.length] }}
            >
              {p.short}
            </div>
            <span className="text-[10px] md:text-xs font-semibold text-foreground/70 text-center leading-tight">
              {p.name}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-border">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-primary">50+</div>
          <div className="text-xs text-muted-foreground">Insurance Partners</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-primary">500+</div>
          <div className="text-xs text-muted-foreground">Plans to Compare</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-primary">2 Cr+</div>
          <div className="text-xs text-muted-foreground">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-primary">98.7%</div>
          <div className="text-xs text-muted-foreground">Claim Success</div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
