import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiArrowRight, FiArrowLeft, FiUser } from "react-icons/fi";
import OnboardingLayout from "../components/OnboardingLayout";

/* ─── Placeholder data ─────────────────────────────────────────────────────
   In production these values come from a shared context / store that is
   populated as the user moves through steps 2 & 3.                         */
const PROFILE = {
  logoUrl: null,
  experience: "12 years",
  projectsCompleted: "25",
  city: "Mumbai",
};

const BASIC = {
  companyName: "Skyline Developers Pvt. Ltd.",
  gstNumber: "22AAAAA0000A1Z5",
  authorizedPerson: "Rajesh Kumar",
  email: "rajesh@skylinedev.com",
  phone: "+91 98765 43210",
  website: "https://skylinedev.com",
  officeAddress: "501, Tower B, Tech Park, Whitefield, Bangalore 560066",
};

/* ─── Read-only row component ─── */
function ReviewRow({ label, value }) {
  return (
    <div className="py-3 border-b border-slate-100 last:border-0">
      <p className="text-[11px] font-semibold text-text-placeholder uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm text-text-heading font-medium">{value || "—"}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*     SCREEN 4 — REVIEW & CONFIRM                 */
/* ═══════════════════════════════════════════════ */
export default function ReviewConfirmPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/status/submitted");
    }, 1500);
  };

  return (
    <>
      {/* ── Full-screen submitting overlay ── */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <svg
            className="animate-spin w-12 h-12 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-semibold text-primary tracking-wide">Submitting your application…</p>
        </div>
      )}

      {/* hideNext + hideBack suppress the layout's persistent button row;
          we render our own full-width stack of buttons inside the form. */}
      <OnboardingLayout
        currentStep={4}
        formId="review-form"
        isSubmitting={isSubmitting}
        hideNext={true}
        hideBack={true}
      >
      <form id="review-form" onSubmit={handleSubmit} className="space-y-5">

        {/* ── Header ── */}
        <div className="space-y-1.5 animate-fade-up">
          <h2 className="text-2xl xl:text-[28px] font-bold text-text-heading tracking-tight">
            Review &amp; Confirm
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Please verify your details before final submission.
          </p>
        </div>

        {/* ── Company Profile card ── */}
        <div className="bg-white rounded-xl border border-border shadow-sm animate-fade-up delay-100">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-text-heading">Company Profile</h3>
            <button
              type="button"
              onClick={() => navigate("/onboarding/company-profile")}
              className="flex items-center gap-1 text-xs font-semibold text-primary
                         hover:text-primary-hover transition-colors cursor-pointer"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          <div className="px-5 pb-2">
            {/* Logo row */}
            <div className="py-3 border-b border-slate-100">
              <p className="text-[11px] font-semibold text-text-placeholder uppercase tracking-wider mb-2">
                Company Logo
              </p>
              {PROFILE.logoUrl ? (
                <img
                  src={PROFILE.logoUrl}
                  alt="Company logo"
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-border
                                flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-text-placeholder" />
                </div>
              )}
            </div>
            <ReviewRow label="Years of Experience"  value={PROFILE.experience} />
            <ReviewRow label="Projects Completed"   value={PROFILE.projectsCompleted} />
            <ReviewRow label="City of Operations"   value={PROFILE.city} />
          </div>
        </div>

        {/* ── Basic Information card ── */}
        <div className="bg-white rounded-xl border border-border shadow-sm animate-fade-up delay-200">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-text-heading">Basic Information</h3>
            <button
              type="button"
              onClick={() => navigate("/onboarding/basic-info")}
              className="flex items-center gap-1 text-xs font-semibold text-primary
                         hover:text-primary-hover transition-colors cursor-pointer"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          <div className="px-5 pb-2">
            <ReviewRow label="Registered Company Name"   value={BASIC.companyName} />
            <ReviewRow label="GST Number"                value={BASIC.gstNumber} />
            <ReviewRow label="Authorized Person Name"    value={BASIC.authorizedPerson} />
            <ReviewRow label="Email Address"             value={BASIC.email} />
            <ReviewRow label="Phone Number"              value={BASIC.phone} />
            <ReviewRow label="Website URL"               value={BASIC.website} />
            <ReviewRow label="Registered Office Address" value={BASIC.officeAddress} />
          </div>
        </div>

        {/* ── Action buttons — full-width stack ── */}
        <div className="space-y-3 animate-fade-up delay-300">
          {/* Primary: Confirm & Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full flex items-center justify-center gap-2 py-3.5 px-8
                       rounded-xl bg-primary text-white text-sm font-semibold
                       hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       disabled:opacity-70 disabled:cursor-not-allowed
                       shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                       transition-all duration-300 cursor-pointer"
          >
            <span>Confirm &amp; Submit</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>

          {/* Secondary: Back — same full-width, outline style */}
          <button
            type="button"
            onClick={() => navigate("/onboarding/basic-info")}
            disabled={isSubmitting}
            className="group w-full flex items-center justify-center gap-2 py-3.5 px-8
                       rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                       hover:border-slate-300 hover:text-text-heading hover:-translate-y-px
                       active:translate-y-0 active:scale-[0.99]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-300 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span>Back</span>
          </button>
        </div>

      </form>
    </OnboardingLayout>
    </>
  );
}
