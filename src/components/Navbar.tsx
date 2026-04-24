import { useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className="flex items-center gap-2">
          <img
            src={livlongLogo}
            alt="Livlong Insurance"
            className="h-9 md:h-10 w-auto"
            width={160}
            height={40}
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-4">
              Insurance <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 bg-card rounded-xl shadow-card-hover border border-border p-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
              <Link to="/health-insurance" className="block px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">Health Insurance</Link>
              {insuranceTypes.slice(1).map((type) => (
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
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
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
          <Link to="/health-insurance" className="block py-2.5 px-3 text-foreground font-medium rounded-lg hover:bg-muted">Health Insurance</Link>
          {insuranceTypes.slice(1).map((type) => (
            <a key={type} href="#" className="block py-2.5 px-3 text-foreground font-medium rounded-lg hover:bg-muted">
              {type}
            </a>
          ))}
          <div className="border-t border-border pt-3 mt-2 space-y-1">
            <Link to="/blog" className="block py-2 px-3 text-foreground font-medium">Blog</Link>
            <Link to="/about" className="block py-2 px-3 text-foreground font-medium">About</Link>
            <Link to="/contact" className="block py-2 px-3 text-foreground font-medium">Contact</Link>
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
