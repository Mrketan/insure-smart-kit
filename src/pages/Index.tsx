import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroLeadForm from "@/components/HeroLeadForm";
import UrgencyBanner from "@/components/UrgencyBanner";
import PlanListing from "@/components/PlanListing";
import PlanComparison from "@/components/PlanComparison";
import UniqueValueSection from "@/components/UniqueValueSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";

const Index = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const plansRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = () => {
    setShowPlans(true);
    setTimeout(() => plansRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroLeadForm onSubmit={handleFormSubmit} />
      <UrgencyBanner />

      {showPlans && (
        <div ref={plansRef}>
          <PlanListing onCompare={setCompareIds} />
        </div>
      )}

      {compareIds.length >= 2 && (
        <PlanComparison planIds={compareIds} onClose={() => setCompareIds([])} />
      )}

      <UniqueValueSection />
      <TrustSection />
      <Footer />

      <StickyCTA onClick={scrollToForm} />
      <WhatsAppButton />
      <LeadPopup />
    </div>
  );
};

export default Index;
