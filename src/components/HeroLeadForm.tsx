import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Users, ChevronRight } from "lucide-react";

interface Props {
  onSubmit: (data: { age: string; gender: string; mobile: string }) => void;
}

const HeroLeadForm = ({ onSubmit }: Props) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && gender && mobile) onSubmit({ age, gender, mobile });
  };

  return (
    <section className="relative gradient-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left - Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-highlight" />
              <span className="text-primary-foreground">India's Trusted Health + Insurance Platform</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
              Get Insurance + Doctor + OPD
              <span className="block text-highlight mt-1">in One Plan</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-md">
              Compare 100+ health plans. Save up to 25% on premiums. Covers your entire family.
            </p>
            <div className="flex gap-6 text-primary-foreground/70 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-highlight" />
                <span>₹5L–₹1Cr Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-highlight" />
                <span>2Cr+ Happy Customers</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card-hover"
            >
              <h2 className="text-xl font-bold text-foreground mb-1">Find the Best Health Plan</h2>
              <p className="text-muted-foreground text-sm mb-6">Get quotes in 30 seconds</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Age</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                          gender === g
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background text-foreground hover:border-primary/50"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted text-muted-foreground text-sm rounded-l-xl border border-r-0 border-input">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-3 rounded-r-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gradient-highlight text-highlight-foreground font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2"
                >
                  View Plans <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroLeadForm;
