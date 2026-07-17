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
          Setup Completed
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-8 animate-fade-up delay-200">
          Towers and units for <strong>Horizon Estates</strong> have been configured successfully.
        </p>

        {/* ── Highlighted Stat Strip ── */}
        <div className="w-full text-left bg-primary-50 rounded-xl border border-primary-100 p-5 mb-8 animate-fade-up delay-300 shadow-sm">
          <div className="flex gap-4 mb-4 pb-4 border-b border-primary/10">
            {/* Cover Thumbnail Placeholder */}
            <div className="w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden border border-primary/20 shadow-sm">
               <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80" alt="Cover" className="w-full h-full object-cover" />
            </div>
            
            {/* Project Info */}
            <div className="flex-1 min-w-0 py-0.5">
              <h3 className="text-base font-bold text-primary-hover truncate">
                Horizon Estates
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-primary/70 mt-1 truncate font-medium">
                <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                Bengaluru, Karnataka
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-primary-hover">1</p>
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mt-0.5">Tower</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary-hover">30</p>
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mt-0.5">Floors</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary-hover">300</p>
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mt-0.5">Units</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary-hover">1</p>
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mt-0.5">BHK Types</p>
            </div>
          </div>
        </div>

        {/* ── WHAT'S NEXT ── */}
        <div className="w-full text-left mb-8 animate-fade-up delay-400">
          <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4 px-1">What's Next</h4>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <span className="text-[11px] font-bold text-text-heading">1</span>
              </div>
              <p className="text-sm text-text-body leading-relaxed pt-0.5">
                Your project goes live and you can start assigning units to buyers.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <span className="text-[11px] font-bold text-text-heading">2</span>
              </div>
              <p className="text-sm text-text-body leading-relaxed pt-0.5">
                You can add more towers and units from the Project Dashboard anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ── Single CTA ── */}
        <button
          type="button"
          onClick={() => navigate("/projects/vasavi-skies")}
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
