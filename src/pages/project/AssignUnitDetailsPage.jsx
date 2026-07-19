import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignUnitDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/assign/buyer-details`);
  };

  const handleBhkChange = (type) => updateDraft("flat", { type });
  const handleSizeChange = (size) => updateDraft("flat", { size });
  const handleFacingChange = (facing) => updateDraft("flat", { facing });
  const handlePlanChange = (plan) => updateDraft("flat", { plan });

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Assign Unit"
      topBarSubtitle={draftData.tower?.name || "Horizon Estates"}
    >
      <div className="max-w-[640px] mx-auto animate-fade-in space-y-6">
        
        {/* ── Recap Chip ── */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide shadow-sm">
          <FiCheck className="w-3.5 h-3.5" />
          Selected flat: {draftData.flat.no} · {draftData.flat.type} · {draftData.flat.facing} facing
        </div>

        {/* ── Header ── */}
        <div className="mb-6 mt-4">
          <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
            Unit Details
          </h2>
          <p className="text-sm text-text-muted">
            Confirm or adjust the specifics of this flat.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-5 space-y-6 shadow-sm glass-card">
            
            {/* BHK Type */}
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-3">
                BHK Type
              </label>
              <div className="flex flex-wrap gap-3">
                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((type) => {
                  const isSelected = draftData.flat.type === type;
                  return (
                    <label key={type} className="cursor-pointer relative">
                      <input 
                        type="radio" 
                        name="bhkType" 
                        className="sr-only" 
                        checked={isSelected}
                        onChange={() => handleBhkChange(type)}
                      />
                      <div className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ease-out
                        ${isSelected 
                          ? 'bg-primary border-primary text-white shadow-md shadow-primary/30 scale-[0.98]'
                          : 'bg-white border-border text-text-body hover:border-primary/40 hover:shadow-sm hover:bg-slate-50 hover:-translate-y-0.5'}
                      `}>
                        <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${isSelected ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}>
                          <FiCheck className="w-4 h-4 shrink-0" />
                        </div>
                        <span>{type}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Unit Size */}
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-3">
                Unit Size
              </label>
              <div className="flex flex-wrap gap-3">
                {["1,250 sq.ft", "1,450 sq.ft", "1,800 sq.ft"].map((size) => {
                  const isSelected = draftData.flat.size === size;
                  return (
                    <label key={size} className="cursor-pointer relative">
                      <input 
                        type="radio" 
                        name="unitSize" 
                        className="sr-only" 
                        checked={isSelected}
                        onChange={() => handleSizeChange(size)}
                      />
                      <div className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ease-out
                        ${isSelected 
                          ? 'bg-primary border-primary text-white shadow-md shadow-primary/30 scale-[0.98]'
                          : 'bg-white border-border text-text-body hover:border-primary/40 hover:shadow-sm hover:bg-slate-50 hover:-translate-y-0.5'}
                      `}>
                        <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${isSelected ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}>
                          <FiCheck className="w-4 h-4 shrink-0" />
                        </div>
                        <span>{size}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Facing */}
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-3">
                Facing
              </label>
              <div className="flex flex-wrap gap-3">
                {["North", "East", "South", "West"].map((facing) => {
                  const isSelected = draftData.flat.facing === facing;
                  return (
                    <label key={facing} className="cursor-pointer relative">
                      <input 
                        type="radio" 
                        name="facing" 
                        className="sr-only" 
                        checked={isSelected}
                        onChange={() => handleFacingChange(facing)}
                      />
                      <div className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ease-out
                        ${isSelected 
                          ? 'bg-primary border-primary text-white shadow-md shadow-primary/30 scale-[0.98]'
                          : 'bg-white border-border text-text-body hover:border-primary/40 hover:shadow-sm hover:bg-slate-50 hover:-translate-y-0.5'}
                      `}>
                        <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${isSelected ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}>
                          <FiCheck className="w-4 h-4 shrink-0" />
                        </div>
                        <span>{facing}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Floor Plan */}
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-3">
                Floor Plan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["2 BHK Elite", "3 BHK Premium", "3 BHK Luxury"].map((planName) => (
                  <label key={planName} className="cursor-pointer relative group">
                    <input 
                      type="radio" 
                      name="floorPlan" 
                      className="peer sr-only" 
                      checked={draftData.flat.plan === planName}
                      onChange={() => handlePlanChange(planName)}
                    />
                    <div className="rounded-xl border border-border overflow-hidden
                                    peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all">
                      <div className="h-24 bg-slate-100 flex items-center justify-center p-2">
                        <img src="https://images.unsplash.com/photo-1600607688069-ce4d0b0b8cde?auto=format&fit=crop&w=300&q=80" alt="Plan" className="w-full h-full object-cover rounded shadow-sm opacity-80" />
                      </div>
                      <div className="p-2.5 bg-white border-t border-border">
                        <p className="text-xs font-semibold text-text-heading text-center">{planName}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cursor-pointer"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${id}/assign/flat`)}
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                         hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              Back to Flats
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
