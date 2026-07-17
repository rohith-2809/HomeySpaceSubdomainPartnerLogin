import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage                from "./pages/LoginPage";
import CompanyProfilePage       from "./pages/CompanyProfilePage";
import BasicInfoPage            from "./pages/BasicInfoPage";
import ReviewConfirmPage        from "./pages/ReviewConfirmPage";
import ApplicationSubmittedPage from "./pages/ApplicationSubmittedPage";
import VerificationPendingPage  from "./pages/VerificationPendingPage";
import AccountVerifiedPage      from "./pages/AccountVerifiedPage";

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
      </Routes>
    </BrowserRouter>
  );
}
