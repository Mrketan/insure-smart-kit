import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-sm">L</span>
          </div>
          <span className="font-extrabold text-xl text-foreground">Livlong</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <a href="#" className="hover:text-primary transition-colors">Health Insurance</a>
          <a href="#" className="hover:text-primary transition-colors">Life Insurance</a>
          <a href="#" className="hover:text-primary transition-colors">OPD Plans</a>
          <a href="#" className="hover:text-primary transition-colors">Claims</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:1800-123-4567" className="flex items-center gap-2 text-sm font-medium text-primary">
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
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 space-y-3">
          <a href="#" className="block py-2 text-foreground font-medium">Health Insurance</a>
          <a href="#" className="block py-2 text-foreground font-medium">Life Insurance</a>
          <a href="#" className="block py-2 text-foreground font-medium">OPD Plans</a>
          <a href="#" className="block py-2 text-foreground font-medium">Claims</a>
          <button className="w-full gradient-highlight text-highlight-foreground font-bold py-3 rounded-xl">
            Get Free Quote
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
