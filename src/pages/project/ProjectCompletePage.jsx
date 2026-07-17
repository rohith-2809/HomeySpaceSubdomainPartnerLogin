import { useNavigate } from "react-router-dom";
import { FiCheck, FiMapPin, FiGrid, FiLayers } from "react-icons/fi";
import StatusLayout from "../../components/StatusLayout";

export default function ProjectCompletePage() {
  const navigate = useNavigate();

  return (
    <StatusLayout>
      <div className="flex flex-col items-center text-center">

        {/* ── Icon: soft teal-tinted, outline/soft-fill ── */}
        <div className="relative mb-7 animate-scale-in">
          <div className="w-[72px] h-[72px] rounded-full bg-primary-50
                          flex items-center justify-center">
            <div className="w-[52px] h-[52px] rounded-full bg-primary-100
                            flex items-center justify-center">
              <FiCheck className="w-7 h-7 text-primary" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ── Heading & Supporting Text ── */}
        <h2 className="text-[19px] font-bold text-text-heading leading-snug mb-3 animate-fade-up delay-100">
          Project setup complete
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-8 animate-fade-up delay-200">
          Your project details, tower structure, and unit configuration have been saved successfully.
        </p>

        {/* ── Mini Summary Card ── */}
        <div className="w-full text-left bg-slate-50 rounded-xl border border-border p-4 mb-8 animate-fade-up delay-300">
          <div className="flex gap-4">
            {/* Cover Thumbnail Placeholder */}
            <div className="w-16 h-16 rounded-lg bg-slate-200 shrink-0 overflow-hidden border border-border">
               <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80" alt="Cover" className="w-full h-full object-cover" />
            </div>
            
            {/* Project Info */}
            <div className="flex-1 min-w-0 py-0.5">
              <h3 className="text-sm font-semibold text-text-heading truncate">
                Skyline Heights
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5 truncate">
                <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                Bengaluru, Karnataka
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted">
                  <FiGrid className="w-3 h-3" />
                  Apartments
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted">
                  <FiLayers className="w-3 h-3" />
                  186 Units
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Muted Note ── */}
        <p className="text-xs text-text-placeholder leading-relaxed mb-6 px-2 animate-fade-up delay-400">
          <strong>What happens next?</strong> You can now review this project in your dashboard, upload more projects, or continue managing towers and units later.
        </p>

        {/* ── Single CTA ── */}
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="w-full flex items-center justify-center py-3.5 px-6
                     rounded-xl bg-primary text-white text-sm font-semibold
                     hover:bg-primary-hover hover:-translate-y-px
                     active:translate-y-0 active:scale-[0.99]
                     shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                     transition-all duration-300 cursor-pointer animate-fade-up delay-500"
        >
          Go to Dashboard
        </button>

      </div>
    </StatusLayout>
  );
}
