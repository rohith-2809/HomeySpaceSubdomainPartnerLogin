import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHome,
  FiFileText,
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";
import OnboardingLayout from "../components/OnboardingLayout";

/* ═══════════════════════════════════════════════ */
/*         SCREEN 2 — BASIC INFORMATION           */
/* ═══════════════════════════════════════════════ */
export default function BasicInfoPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [authorizedPerson, setAuthorizedPerson] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate save — next steps (Documents, Bank Details, Verification) are disabled for now
    setTimeout(() => {
      setIsSubmitting(false);
      // For now, just show an alert since later steps aren't built yet
      alert("Basic Information saved! Further onboarding steps coming soon.");
    }, 1200);
  };

  return (
    <OnboardingLayout currentStep={3}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="space-y-2 animate-fade-up">
          <h2 className="text-2xl xl:text-[28px] font-bold text-text-heading tracking-tight">
            Basic Information
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-md">
            Provide your company's official details for verification and communication.
          </p>
        </div>

        {/* Form fields — two-column grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          {/* Registered Company Name */}
          <div className="space-y-1.5 animate-fade-up delay-100">
            <label
              htmlFor="company-name"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Registered Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiHome className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="company-name"
                name="companyName"
                type="text"
                required
                placeholder="e.g. Skyline Developers Pvt. Ltd."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* GST Number */}
          <div className="space-y-1.5 animate-fade-up delay-200">
            <label
              htmlFor="gst-number"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              GST Number <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiFileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="gst-number"
                name="gstNumber"
                type="text"
                required
                placeholder="e.g. 22AAAAA0000A1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Authorized Person Name */}
          <div className="space-y-1.5 animate-fade-up delay-200">
            <label
              htmlFor="authorized-person"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Authorized Person Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="authorized-person"
                name="authorizedPerson"
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                value={authorizedPerson}
                onChange={(e) => setAuthorizedPerson(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5 animate-fade-up delay-300">
            <label
              htmlFor="email-address"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="email-address"
                name="emailAddress"
                type="email"
                required
                placeholder="e.g. rajesh@skylinedev.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 animate-fade-up delay-300">
            <label
              htmlFor="phone-number"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="space-y-1.5 animate-fade-up delay-400">
            <label
              htmlFor="website-url"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Website URL
            </label>
            <div className="relative group">
              <FiGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="website-url"
                name="websiteUrl"
                type="url"
                placeholder="e.g. https://skylinedev.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Registered Office Address — full width spanning both columns */}
          <div className="space-y-1.5 md:col-span-2 animate-fade-up delay-500">
            <label
              htmlFor="office-address"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Registered Office Address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiMapPin className="absolute left-3.5 top-4 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <textarea
                id="office-address"
                name="officeAddress"
                required
                rows={3}
                placeholder="e.g. 501, Tower B, Tech Park, Whitefield, Bangalore 560066"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder resize-none
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Submit — "Next" button */}
        <div className="pt-2 animate-fade-up delay-600">
          <button
            id="btn-basic-info-next"
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full sm:w-auto sm:min-w-[200px] sm:ml-auto flex items-center justify-center gap-2 py-3.5 px-8
                       rounded-xl bg-primary text-white text-sm font-semibold
                       hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       disabled:opacity-70 disabled:cursor-not-allowed
                       shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                       transition-all duration-300 cursor-pointer sm:float-right"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <span>Next</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </>
            )}
          </button>
          {/* Clear float */}
          <div className="clear-both" />
        </div>
      </form>
    </OnboardingLayout>
  );
}
