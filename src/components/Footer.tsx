import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="gradient-primary py-12 pb-24 md:pb-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Products</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#" className="block hover:text-primary-foreground">Health Insurance</a>
            <a href="#" className="block hover:text-primary-foreground">Life Insurance</a>
            <a href="#" className="block hover:text-primary-foreground">OPD Plans</a>
            <a href="#" className="block hover:text-primary-foreground">Family Plans</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Company</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#" className="block hover:text-primary-foreground">About Us</a>
            <a href="#" className="block hover:text-primary-foreground">Careers</a>
            <a href="#" className="block hover:text-primary-foreground">Blog</a>
            <a href="#" className="block hover:text-primary-foreground">Press</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Support</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#" className="block hover:text-primary-foreground">Help Center</a>
            <a href="#" className="block hover:text-primary-foreground">File a Claim</a>
            <a href="#" className="block hover:text-primary-foreground">Contact Us</a>
            <a href="#" className="block hover:text-primary-foreground">FAQ</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Legal</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#" className="block hover:text-primary-foreground">Privacy Policy</a>
            <a href="#" className="block hover:text-primary-foreground">Terms of Service</a>
            <a href="#" className="block hover:text-primary-foreground">IRDAI License</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
          Made with <Heart className="w-4 h-4 text-highlight fill-highlight" /> by Livlong
        </div>
        <p className="text-xs text-primary-foreground/50">IRDAI Web Aggregator License No. IRDAI/INT/WBA/XX/2024</p>
      </div>
    </div>
  </footer>
);

export default Footer;
