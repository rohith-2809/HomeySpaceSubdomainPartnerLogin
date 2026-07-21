import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import { AssignUnitProvider } from "./context/AssignUnitContext";
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
import ReviewSetupPage          from "./pages/project/ReviewSetupPage";
import ProjectCompletePage      from "./pages/project/ProjectCompletePage";
import ProjectDetailPage        from "./pages/project/ProjectDetailPage";

// Assign Unit Flow
import AssignUnitTowerPage      from "./pages/project/AssignUnitTowerPage";
import AssignUnitFlatPage       from "./pages/project/AssignUnitFlatPage";
import AssignUnitDetailsPage    from "./pages/project/AssignUnitDetailsPage";
import AssignBuyerDetailsPage   from "./pages/project/AssignBuyerDetailsPage";
import AssignBookingDetailsPage from "./pages/project/AssignBookingDetailsPage";
import AssignReviewPage         from "./pages/project/AssignReviewPage";
import AssignCompletePage       from "./pages/project/AssignCompletePage";
import DocumentsGalleryPage    from "./pages/project/DocumentsGalleryPage";
import FloorPlansPage          from "./pages/project/FloorPlansPage";

export default function App() {
  return (
    <ProjectProvider>
      <AssignUnitProvider>
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
            <Route path="/projects/new/review"    element={<ReviewSetupPage />} />
            <Route path="/projects/new/complete"  element={<ProjectCompletePage />} />

            {/* ── Project Detail & Assign Flow ── */}
            <Route path="/projects/:id"                      element={<ProjectDetailPage />} />
            <Route path="/projects/:id/assign/tower"         element={<AssignUnitTowerPage />} />
            <Route path="/projects/:id/assign/flat"          element={<AssignUnitFlatPage />} />
            <Route path="/projects/:id/assign/unit-details"  element={<AssignUnitDetailsPage />} />
            <Route path="/projects/:id/assign/buyer-details" element={<AssignBuyerDetailsPage />} />
            <Route path="/projects/:id/assign/booking-details" element={<AssignBookingDetailsPage />} />
            <Route path="/projects/:id/assign/review"        element={<AssignReviewPage />} />
            <Route path="/projects/:id/assign/complete"      element={<AssignCompletePage />} />
            <Route path="/projects/:id/documents"            element={<DocumentsGalleryPage />} />
            <Route path="/projects/:id/floor-plans"          element={<FloorPlansPage />} />

            {/* ── Catch-all / 404 Redirects ── */}
            <Route path="/index.html"             element={<Navigate to="/" replace />} />
            <Route path="*"                       element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AssignUnitProvider>
    </ProjectProvider>
  );
}
