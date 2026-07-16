import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiChevronLeft } from "react-icons/fi";

/* ─── Logo helper (same as LoginPage) ─── */
function TransparentLogo({ src, color = "original", className, alt = "HomeySpace" }) {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness >= 253) {
          data[i + 3] = 0;
        } else if (brightness <= 220) {
          if (color === "white") {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        } else {
          const factor = (253 - brightness) / (253 - 220);
          data[i + 3] = Math.round(data[i + 3] * factor);
          if (color === "white") {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, color]);

  if (!processedSrc) {
    return <div className={`inline-block bg-transparent ${className}`} style={{ aspectRatio: "1/1" }} />;
  }

  return <img src={processedSrc} alt={alt} className={className} />;
}

/* ─── Onboarding step definitions ─── */
const STEPS = [
  { number: 1, label: "Sign In",          path: "/" },
  { number: 2, label: "Company Profile",  path: "/onboarding/company-profile" },
  { number: 3, label: "Basic Information", path: "/onboarding/basic-info" },
  { number: 4, label: "Documents",         path: "/onboarding/documents" },
  { number: 5, label: "Bank Details",      path: "/onboarding/bank-details" },
  { number: 6, label: "Verification",      path: "/onboarding/verification" },
];

/* ═══════════════════════════════════════════════ */
/*           ONBOARDING LAYOUT SHELL              */
/* ═══════════════════════════════════════════════ */
export default function OnboardingLayout({ currentStep, children, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStep > 1) {
      const prevStep = STEPS[currentStep - 2];
      navigate(prevStep.path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ─────────────── MOBILE PROGRESS BAR (< 1024px) ─────────────── */}
      <div className="lg:hidden bg-gradient-to-r from-[#0c635c] via-primary to-primary-light px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <TransparentLogo
              src="/HomeyspaceLogo.png"
              color="white"
              className="h-7 w-auto"
            />
            <span className="text-white text-base font-bold tracking-tight">HomeySpace</span>
          </div>
          <span className="text-white/70 text-xs font-medium tracking-wide">
            Step {currentStep} of {STEPS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                step.number < currentStep
                  ? "bg-primary-100 scale-100"
                  : step.number === currentStep
                  ? "bg-white scale-125"
                  : "bg-white/25 scale-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─────────────── LEFT STEP PANEL (desktop ≥ 1024px) ─────────────── */}
      <div className="hidden lg:flex lg:w-[30%] lg:max-w-[340px] relative overflow-hidden bg-gradient-to-br from-[#0c635c] via-primary to-primary-light">
        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative gradient orbs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/[0.06] blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-24 w-64 h-64 rounded-full bg-primary-light/20 blur-3xl animate-float delay-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-12 w-full">
          {/* Logo */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <TransparentLogo
                src="/HomeyspaceLogo.png"
                color="white"
                className="h-9 w-auto"
              />
              <span className="text-white text-xl font-bold tracking-tight">HomeySpace</span>
            </div>

            <p className="text-white/50 text-xs font-medium tracking-wider uppercase mt-8 mb-6">
              Setup Progress
            </p>
          </div>

          {/* Vertical step list */}
          <div className="flex-1 flex flex-col gap-0">
            {STEPS.map((step, index) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;
              const isUpcoming = step.number > currentStep;

              return (
                <div key={step.number} className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
                  {/* Step indicator column */}
                  <div className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 shrink-0 ${
                        isCompleted
                          ? "bg-primary-100 text-primary"
                          : isCurrent
                          ? "bg-white text-primary shadow-lg shadow-white/20"
                          : "bg-white/10 text-white/40 border border-white/10"
                      }`}
                    >
                      {isCompleted ? (
                        <FiCheck className="w-4 h-4" />
                      ) : (
                        step.number
                      )}
                    </div>

                    {/* Connecting line */}
                    {index < STEPS.length - 1 && (
                      <div
                        className={`w-[2px] h-10 mt-1 rounded-full transition-all duration-500 ${
                          isCompleted ? "bg-primary-100/60" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className="pt-1.5">
                    <p
                      className={`text-sm font-medium transition-all duration-300 ${
                        isCompleted
                          ? "text-primary-100"
                          : isCurrent
                          ? "text-white font-semibold"
                          : "text-white/35"
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-[11px] text-white/45 mt-0.5">In progress</p>
                    )}
                    {isCompleted && (
                      <p className="text-[11px] text-primary-100/60 mt-0.5">Completed</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom — minimal copyright */}
          <p className="text-xs text-white/30 animate-fade-in delay-700 mt-8">
            &copy; {new Date().getFullYear()} HomeySpace Technologies Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* ─────────────── RIGHT FORM PANEL ─────────────── */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-16 bg-surface-page overflow-y-auto">
        <div className="w-full max-w-[640px] animate-scale-in">
          {/* Back arrow */}
          <button
            id="btn-onboarding-back"
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-1.5 text-sm text-text-muted hover:text-text-heading mb-8 -ml-1
                       transition-all duration-300 cursor-pointer"
          >
            <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span>Back</span>
          </button>

          {/* Form content injected here */}
          {children}
        </div>
      </div>
    </div>
  );
}
