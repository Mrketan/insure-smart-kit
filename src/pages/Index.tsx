import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroLeadForm from "@/components/HeroLeadForm";
import UrgencyBanner from "@/components/UrgencyBanner";
import InsuranceCategories from "@/components/InsuranceCategories";
import PartnersSection from "@/components/PartnersSection";
import HowItWorks from "@/components/HowItWorks";
import PlanListing from "@/components/PlanListing";
import PlanComparison from "@/components/PlanComparison";
import DynamicComparisonShowcase from "@/components/DynamicComparisonShowcase";
import UniqueValueSection from "@/components/UniqueValueSection";
import TrustSection from "@/components/TrustSection";
import HealthInsuranceCalculator from "@/components/HealthInsuranceCalculator";
import SavingsCalculator from "@/components/SavingsCalculator";
import InstantPremiumEstimator from "@/components/InstantPremiumEstimator";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";
import LiveActivityNotification from "@/components/LiveActivityNotification";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = () => {
    setShowPlans(true);
    setTimeout(() => plansRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompareChange = (ids: number[]) => {
    setCompareIds(ids);
    if (ids.length < 2) setShowComparison(false);
  };

  const handleCompareOpen = (ids: number[]) => {
    setCompareIds(ids);
    setShowComparison(true);
  };

  const handleRemoveFromComparison = (id: number) => {
    const next = compareIds.filter((i) => i !== id);
    setCompareIds(next);
    if (next.length < 2) setShowComparison(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroLeadForm onSubmit={handleFormSubmit} />
      <PartnersSection />
      <InsuranceCategories />
      <HowItWorks />
      <UrgencyBanner />

      {showPlans && (
        <div ref={plansRef}>
          <PlanListing
            compareIds={compareIds}
            onCompareChange={handleCompareChange}
            onCompareOpen={handleCompareOpen}
          />
        </div>
      )}

      {showComparison && compareIds.length >= 2 && (
        <PlanComparison
          planIds={compareIds}
          onClose={() => setShowComparison(false)}
          onRemove={handleRemoveFromComparison}
        />
      )}

      <UniqueValueSection />
      <HealthInsuranceCalculator />
      <InstantPremiumEstimator />
      <SavingsCalculator />
      <TrustSection />
      <Footer />

      <StickyCTA onClick={scrollToForm} />
      <WhatsAppButton />
      <LeadPopup />
      <LiveActivityNotification />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
