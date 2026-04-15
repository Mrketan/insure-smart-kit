import { ChevronRight } from "lucide-react";

const StickyCTA = ({ onClick }: { onClick: () => void }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-card/90 backdrop-blur-lg border-t border-border md:hidden">
    <button
      onClick={onClick}
      className="w-full gradient-highlight text-highlight-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-base"
    >
      View Plans <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

export default StickyCTA;
