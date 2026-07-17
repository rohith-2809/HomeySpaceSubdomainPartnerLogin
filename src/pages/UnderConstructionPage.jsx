import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiCompass } from "react-icons/fi";
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
      <div className="relative w-full h-[calc(100vh-140px)] rounded-3xl overflow-hidden flex flex-col items-center justify-center bg-white border border-border">
        
        {/* ── Background Glow Effects ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-[100%] blur-[80px] pointer-events-none animate-pulse-ring" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-amber-500/5 rounded-[100%] blur-[80px] pointer-events-none" />

        {/* ── Content Container ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
          
          {/* Floating Premium Icon */}
          <div className="mb-8 animate-float">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-white
                            border border-primary/20 shadow-[0_8px_32px_rgba(15,118,110,0.15)]
                            flex items-center justify-center">
              <FiCompass className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Typography */}
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading tracking-tight mb-4 animate-fade-up delay-100">
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">{featureName}</span> Experience
          </h2>
          
          <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-lg mx-auto mb-10 animate-fade-up delay-200">
            Our engineering and design teams are meticulously building this module to ensure it meets our highest standards. It will be available in an upcoming release.
          </p>

          {/* Action */}
          <div className="animate-fade-up delay-300">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="group flex items-center justify-center gap-2.5 py-3.5 px-8
                         rounded-full bg-text-heading text-white text-sm font-semibold
                         hover:bg-black hover:scale-105 active:scale-95
                         shadow-xl shadow-slate-900/20
                         transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Return to Dashboard</span>
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
