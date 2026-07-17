import { useNavigate, useLocation } from "react-router-dom";
import { FiTool, FiArrowLeft } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

export default function UnderConstructionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which feature is being accessed based on the path
  let featureName = "This feature";
  let activeNav = "Dashboard";

  if (location.pathname.includes("team")) {
    featureName = "Team Access";
    activeNav = "Team Access";
  } else if (location.pathname.includes("sales")) {
    featureName = "Sales Performance";
  } else if (location.pathname.includes("documents")) {
    featureName = "Documents";
  } else if (location.pathname.includes("settings")) {
    featureName = "Settings";
    activeNav = "Settings";
  }

  return (
    <DashboardLayout
      activeNav={activeNav}
      locked={false}
      topBarTitle={featureName}
      topBarSubtitle="Coming Soon"
    >
      <div className="flex flex-col items-center justify-center text-center h-[60vh] max-w-md mx-auto animate-fade-in">
        
        {/* ── Icon ── */}
        <div className="relative mb-6 animate-scale-in">
          <div className="w-[84px] h-[84px] rounded-full bg-slate-100
                          flex items-center justify-center border border-slate-200">
            <div className="w-[60px] h-[60px] rounded-full bg-white shadow-sm
                            flex items-center justify-center border border-slate-100">
              <FiTool className="w-7 h-7 text-text-placeholder" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* ── Heading & Text ── */}
        <h2 className="text-xl font-bold text-text-heading tracking-tight mb-3 animate-fade-up delay-100">
          Under Construction
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-8 animate-fade-up delay-200">
          The <span className="font-semibold text-text-body">{featureName}</span> module is currently being built. Our engineering team is actively working on it, and it will be available in an upcoming release.
        </p>

        {/* ── CTA ── */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="group flex items-center justify-center gap-2 py-3 px-6
                     rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                     hover:border-slate-300 hover:text-text-heading hover:-translate-y-px
                     active:translate-y-0 active:scale-[0.99]
                     shadow-sm hover:shadow-md
                     transition-all duration-300 cursor-pointer animate-fade-up delay-300"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          <span>Return to Dashboard</span>
        </button>

      </div>
    </DashboardLayout>
  );
}
