import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";

export default function ReviewSetupPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/projects/new/complete");
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Setup Project"
      topBarSubtitle="Step 5 of 5"
    >
      <div className="max-w-[640px] mx-auto animate-fade-in">
        
        {/* ── Heading ── */}
        <div className="mb-8 space-y-1.5">
          <h2 className="text-2xl font-bold text-text-heading tracking-tight">
            Review Setup
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Verify your towers and units before publishing this project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Tower Info Card ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Tower Info</h3>
              <button 
                type="button" 
                onClick={() => navigate("/projects/new/towers")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Tower Name</p>
                <p className="text-sm font-medium text-text-heading">Tower A</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Total Floors</p>
                <p className="text-sm font-medium text-text-heading">30</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Units per Floor</p>
                <p className="text-sm font-medium text-text-heading">10</p>
              </div>
            </div>
          </div>

          {/* ── Configuration (2 BHK) Card ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">2 BHK</h3>
              <button 
                type="button" 
                onClick={() => navigate("/projects/new/units")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Carpet Area</p>
                <p className="text-sm font-medium text-text-heading">1250 Sq. Ft.</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                <p className="text-sm font-medium text-text-heading">North</p>
              </div>
            </div>
          </div>

          {/* ── Unit Numbering Card ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Unit Numbering</h3>
              <button 
                type="button" 
                onClick={() => navigate("/projects/new/units")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm font-medium text-text-heading leading-relaxed">
                101, 102, 103, 104, 105, 106, 107, 108, 109, 110
              </p>
            </div>
          </div>

          {/* ── Summary Line ── */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate-50 rounded-xl border border-border mt-2">
            <div>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Total BHK Types</p>
              <p className="text-base font-bold text-text-heading">1</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Total Units</p>
              <p className="text-base font-bold text-primary">300</p>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-6 mt-4 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects/new/units")}
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6
                         rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                         hover:border-slate-300 hover:text-text-heading hover:-translate-x-px
                         active:translate-x-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3.5 px-8
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cursor-pointer"
            >
              <FiCheck className="w-4 h-4" />
              <span>Confirm &amp; Save Project</span>
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
