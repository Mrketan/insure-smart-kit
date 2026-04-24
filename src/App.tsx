import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AdminLeadDetail from "./pages/admin/AdminLeadDetail.tsx";
import AdminStaff from "./pages/admin/AdminStaff.tsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import HealthInsurance from "./pages/HealthInsurance.tsx";
import Blog from "./pages/Blog.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health-insurance" element={<HealthInsurance />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/leads/:id" element={<AdminLeadDetail />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
