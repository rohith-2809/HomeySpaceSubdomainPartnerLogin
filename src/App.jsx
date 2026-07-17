import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage                from "./pages/LoginPage";
import CompanyProfilePage       from "./pages/CompanyProfilePage";
import BasicInfoPage            from "./pages/BasicInfoPage";
import ReviewConfirmPage        from "./pages/ReviewConfirmPage";
import ApplicationSubmittedPage from "./pages/ApplicationSubmittedPage";
import VerificationPendingPage  from "./pages/VerificationPendingPage";
import AccountVerifiedPage      from "./pages/AccountVerifiedPage";

// Dashboard
import DashboardHomePage        from "./pages/DashboardHomePage";
import UnderConstructionPage    from "./pages/UnderConstructionPage";

// Project Setup Flow
import ProjectsListPage         from "./pages/project/ProjectsListPage";
import AddProjectPage           from "./pages/project/AddProjectPage";
import LocationDetailsPage      from "./pages/project/LocationDetailsPage";
import TowersBlocksPage         from "./pages/project/TowersBlocksPage";
import UnitsSetupPage           from "./pages/project/UnitsSetupPage";
import ProjectCompletePage      from "./pages/project/ProjectCompletePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Onboarding flow ── */}
        <Route path="/"                          element={<LoginPage />} />
        <Route path="/onboarding/company-profile" element={<CompanyProfilePage />} />
        <Route path="/onboarding/basic-info"      element={<BasicInfoPage />} />
        <Route path="/onboarding/review"          element={<ReviewConfirmPage />} />

        {/* ── Post-submission status screens ── */}
        <Route path="/status/submitted" element={<ApplicationSubmittedPage />} />
        <Route path="/status/pending"   element={<VerificationPendingPage />} />
        <Route path="/status/verified"  element={<AccountVerifiedPage />} />

        {/* ── Dashboard (Fully Authenticated) ── */}
        <Route path="/dashboard"              element={<DashboardHomePage />} />
        
        {/* ── Under Construction Modules ── */}
        <Route path="/team"                   element={<UnderConstructionPage />} />
        <Route path="/sales"                  element={<UnderConstructionPage />} />
        <Route path="/documents"              element={<UnderConstructionPage />} />
        <Route path="/settings"               element={<UnderConstructionPage />} />

        {/* ── Project Setup Flow ── */}
        <Route path="/projects"               element={<ProjectsListPage />} />
        <Route path="/projects/new"           element={<AddProjectPage />} />
        <Route path="/projects/new/location"  element={<LocationDetailsPage />} />
        <Route path="/projects/new/towers"    element={<TowersBlocksPage />} />
        <Route path="/projects/new/units"     element={<UnitsSetupPage />} />
        <Route path="/projects/new/complete"  element={<ProjectCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}
