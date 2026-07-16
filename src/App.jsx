import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import BasicInfoPage from "./pages/BasicInfoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/onboarding/company-profile" element={<CompanyProfilePage />} />
        <Route path="/onboarding/basic-info" element={<BasicInfoPage />} />
        {/* Placeholder routes for future onboarding steps — redirect to basic-info for now */}
        <Route path="/onboarding/documents" element={<Navigate to="/onboarding/basic-info" replace />} />
        <Route path="/onboarding/bank-details" element={<Navigate to="/onboarding/basic-info" replace />} />
        <Route path="/onboarding/verification" element={<Navigate to="/onboarding/basic-info" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
