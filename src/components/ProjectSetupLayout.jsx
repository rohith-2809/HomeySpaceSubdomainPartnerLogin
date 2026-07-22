import { useNavigate } from "react-router-dom";
import { FiCheck, FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import DashboardLayout from "./DashboardLayout";

const STEPS = [
  { number: 1, label: "Project Details", path: "/projects/new" },
  { number: 2, label: "Location",        path: "/projects/new/location" },
  { number: 3, label: "Towers & Blocks", path: "/projects/new/towers" },
  { number: 4, label: "Units Setup",     path: "/projects/new/units" },
  { number: 5, label: "Review",          path: "/projects/new/review" },
];

export default function ProjectSetupLayout({
  currentStep,
  children,
  onBack,
  formId,
  isSubmitting = false,
  hideNext = false,
  hideBack = false,
  nextLabel = "Next",
  title = "Setup Project",
  subtitle = "Configure your new property",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStep > 1) {
      const prevStep = STEPS[currentStep - 2];
      navigate(prevStep.path);
    } else {
      navigate("/projects");
    }
  };

  return (
    <DashboardLayout activeNav="Projects" locked={false} topBarTitle={title} topBarSubtitle={subtitle}>
      
      {/* Top action row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-heading tracking-tight">Create New Project</h2>
        <button 
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-heading bg-white border border-border rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          <FiX className="w-4 h-4" /> Cancel
        </button>
      </div>

      <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-h-[600px] animate-fade-in">
        
        {/* ── Left Sidebar (Steps) ── */}
        <div className="w-full md:w-64 lg:w-72 bg-slate-50 border-r border-border p-6 shrink-0 flex flex-col">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-6">Setup Progress</p>
          <div className="flex flex-row md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {STEPS.map((step, index) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;
              const isUpcoming = step.number > currentStep;

              return (
                <div key={step.number} className="flex md:flex-row flex-col items-center md:items-start gap-2 md:gap-4 shrink-0 opacity-100">
                  {/* Indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                        isCompleted
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : isCurrent
                          ? "bg-white text-primary border-2 border-primary shadow-sm"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      {isCompleted ? <FiCheck className="w-3.5 h-3.5" /> : step.number}
                    </div>
                    {/* Line */}
                    {index < STEPS.length - 1 && (
                      <div
                        className={`hidden md:block w-0.5 h-8 my-1 rounded-full transition-colors ${
                          isCompleted ? "bg-primary/30" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="pt-1.5 text-center md:text-left">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isCompleted
                          ? "text-text-heading"
                          : isCurrent
                          ? "text-primary"
                          : "text-text-placeholder"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Content Area ── */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
             {children}
          </div>

          {/* Persistent Footer Actions */}
          <div className="border-t border-border bg-slate-50/50 p-5 md:p-6 flex items-center justify-between mt-auto">
            <button
              id="btn-setup-back"
              type="button"
              onClick={handleBack}
              className={`group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-border
                         text-sm font-semibold text-text-body bg-white shadow-sm
                         hover:border-slate-300 hover:text-text-heading hover:-translate-x-px
                         active:translate-x-0 active:scale-[0.99] transition-all
                         ${hideBack ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <button
              id="btn-setup-next"
              type="submit"
              form={formId}
              disabled={isSubmitting}
              className={`group relative flex items-center justify-center gap-2 py-2.5 px-6
                         rounded-xl bg-primary text-white text-sm font-semibold min-w-[140px]
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all
                         ${hideNext ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <span>{nextLabel}</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
