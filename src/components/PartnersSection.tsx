import { motion } from "framer-motion";

const partners = [
  "Star Health", "HDFC Ergo", "ICICI Lombard", "Niva Bupa",
  "Care Health", "Bajaj Allianz", "Tata AIG", "Max Bupa",
  "New India", "Reliance General", "SBI General", "Kotak Life",
];

const PartnersSection = () => (
  <section className="py-10 md:py-14 bg-muted/50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Trusted by 50+ Insurance Partners
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {partners.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-xl py-4 px-3 flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow"
          >
            <span className="text-xs md:text-sm font-bold text-foreground/70 text-center">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
