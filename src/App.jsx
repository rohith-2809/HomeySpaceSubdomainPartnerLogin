import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProjectProvider } from "./context/ProjectContext";
import { ProjectSetupProvider } from "./context/ProjectSetupContext";
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

export default function App() {
  const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;
  return (
    <BrowserRouter>
      <AuthProvider>
        <OnboardingProvider>
          <ProjectProvider>
            <ProjectSetupProvider>
            <AssignUnitProvider>
              <Routes>
                {/* ── Auth + onboarding flow ── */}
                <Route path="/"                           element={<LoginPage />} />
                <Route path="/onboarding/company-profile" element={guard(<CompanyProfilePage />)} />
                <Route path="/onboarding/basic-info"      element={guard(<BasicInfoPage />)} />
                <Route path="/onboarding/review"          element={guard(<ReviewConfirmPage />)} />

                {/* ── Post-submission status screens ── */}
                <Route path="/status/submitted" element={guard(<ApplicationSubmittedPage />)} />
                <Route path="/status/pending"   element={guard(<VerificationPendingPage />)} />
                <Route path="/status/verified"  element={guard(<AccountVerifiedPage />)} />

                {/* ── Dashboard (Fully Authenticated) ── */}
                <Route path="/dashboard"              element={guard(<DashboardHomePage />)} />

                {/* ── Under Construction Modules ── */}
                <Route path="/team"                   element={guard(<UnderConstructionPage />)} />
                <Route path="/sales"                  element={guard(<UnderConstructionPage />)} />
                <Route path="/documents"              element={guard(<UnderConstructionPage />)} />
                <Route path="/settings"               element={guard(<UnderConstructionPage />)} />

                {/* ── Project Setup Flow ── */}
                <Route path="/projects"               element={guard(<ProjectsListPage />)} />
                <Route path="/projects/new"           element={guard(<AddProjectPage />)} />
                <Route path="/projects/new/location"  element={guard(<LocationDetailsPage />)} />
                <Route path="/projects/new/towers"    element={guard(<TowersBlocksPage />)} />
                <Route path="/projects/new/units"     element={guard(<UnitsSetupPage />)} />
                <Route path="/projects/new/review"    element={guard(<ReviewSetupPage />)} />
                <Route path="/projects/new/complete"  element={guard(<ProjectCompletePage />)} />

                {/* ── Project Detail & Assign Flow ── */}
                <Route path="/projects/:id"                      element={guard(<ProjectDetailPage />)} />
                <Route path="/projects/:id/assign/tower"         element={guard(<AssignUnitTowerPage />)} />
                <Route path="/projects/:id/assign/flat"          element={guard(<AssignUnitFlatPage />)} />
                <Route path="/projects/:id/assign/unit-details"  element={guard(<AssignUnitDetailsPage />)} />
                <Route path="/projects/:id/assign/buyer-details" element={guard(<AssignBuyerDetailsPage />)} />
                <Route path="/projects/:id/assign/booking-details" element={guard(<AssignBookingDetailsPage />)} />
                <Route path="/projects/:id/assign/review"        element={guard(<AssignReviewPage />)} />
                <Route path="/projects/:id/assign/complete"      element={guard(<AssignCompletePage />)} />

                {/* ── Catch-all / 404 Redirects ── */}
                <Route path="/index.html"             element={<Navigate to="/" replace />} />
                <Route path="*"                       element={<Navigate to="/" replace />} />
              </Routes>
            </AssignUnitProvider>
            </ProjectSetupProvider>
          </ProjectProvider>
        </OnboardingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
