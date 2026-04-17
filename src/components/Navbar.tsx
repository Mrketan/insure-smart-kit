import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import livlongLogo from "@/assets/livlong-logo.png";

const insuranceTypes = [
  "Health Insurance",
  "Life Insurance",
  "Car Insurance",
  "Bike Insurance",
  "Travel Insurance",
  "Home Insurance",
  "Business Insurance",
  "Family Floater",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <img
            src={livlongLogo}
            alt="Livlong Insurance"
            className="h-9 md:h-10 w-auto"
            width={160}
            height={40}
          />
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-4">
              Insurance <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 bg-card rounded-xl shadow-card-hover border border-border p-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
              {insuranceTypes.map((type) => (
                <a
                  key={type}
                  href="#"
                  className="block px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  {type}
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="hover:text-primary transition-colors">Claims</a>
          <a href="#" className="hover:text-primary transition-colors">Renewals</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:1800-123-4567"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="w-4 h-4" /> 1800-123-4567
          </a>
          <button className="gradient-highlight text-highlight-foreground font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
            Get Free Quote
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 space-y-1 max-h-[70vh] overflow-y-auto">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-3 pb-1 px-3">
            Insurance Products
          </p>
          {insuranceTypes.map((type) => (
            <a key={type} href="#" className="block py-2.5 px-3 text-foreground font-medium rounded-lg hover:bg-muted">
              {type}
            </a>
          ))}
          <div className="border-t border-border pt-3 mt-2 space-y-2">
            <a href="#" className="block py-2 px-3 text-foreground font-medium">Claims</a>
            <a href="#" className="block py-2 px-3 text-foreground font-medium">Renewals</a>
            <a href="#" className="block py-2 px-3 text-foreground font-medium">Support</a>
          </div>
          <button className="w-full gradient-highlight text-highlight-foreground font-bold py-3 rounded-xl mt-2">
            Get Free Quote
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
