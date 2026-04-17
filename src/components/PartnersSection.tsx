import { motion } from "framer-motion";
import starHealth from "@/assets/partners/star-health.png";
import hdfcErgo from "@/assets/partners/hdfc-ergo.png";
import iciciLombard from "@/assets/partners/icici-lombard.png";
import nivaBupa from "@/assets/partners/niva-bupa.png";
import careHealth from "@/assets/partners/care-health.png";
import bajajAllianz from "@/assets/partners/bajaj-allianz.png";
import tataAig from "@/assets/partners/tata-aig.png";
import maxBupa from "@/assets/partners/max-bupa.png";

const partners = [
  { name: "Star Health", logo: starHealth },
  { name: "HDFC Ergo", logo: hdfcErgo },
  { name: "ICICI Lombard", logo: iciciLombard },
  { name: "Niva Bupa", logo: nivaBupa },
  { name: "Care Health", logo: careHealth },
  { name: "Bajaj Allianz", logo: bajajAllianz },
  { name: "Tata AIG", logo: tataAig },
  { name: "Max Bupa", logo: maxBupa },
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

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-3 md:p-4 flex items-center justify-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 cursor-pointer min-h-[90px] grayscale hover:grayscale-0"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              width={120}
              height={60}
              className="max-h-14 w-auto object-contain"
            />
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
