import { useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiSettings } from "react-icons/fi";
import AssignUnitLayout from "../../components/AssignUnitLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";
import { useProjects } from "../../context/ProjectContext";

export default function AssignUnitDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();
  const { getProject } = useProjects();
  
  const project = getProject(id);

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
    <AssignUnitLayout
      currentStep={3}
      projectId={id}
      projectName={project?.name || "Project"}
      title="Assign Unit"
      subtitle="Step 3: Unit Configuration"
      formId="unit-details-form"
    >
      <div className="animate-fade-in w-full max-w-5xl">
        
        {/* ── Recap Info ── */}
        <div className="flex items-center gap-3 mb-6 bg-slate-50 border border-border px-5 py-3 rounded-xl inline-flex shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FiCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Selected Unit</p>
            <p className="text-sm font-bold text-text-heading leading-none">
              {draftData.tower?.name} — Flat {draftData.flat.no}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Unit Configuration
            </h2>
            <p className="text-sm text-text-muted">
              Confirm or adjust the specifics of this unit.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiSettings className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Configuration</p>
              <p className="text-sm font-bold text-primary leading-none">{draftData.flat.type}</p>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <form id="unit-details-form" onSubmit={handleSubmit}>
          
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* BHK Type */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
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
                          flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all duration-200
                          ${isSelected 
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'bg-slate-50 border-border text-text-muted hover:border-slate-300 hover:text-text-heading'}
                        `}>
                          <span>{type}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Facing */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
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
                          flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all duration-200
                          ${isSelected 
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'bg-slate-50 border-border text-text-muted hover:border-slate-300 hover:text-text-heading'}
                        `}>
                          <span>{facing}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Unit Size */}
              <div className="space-y-4 md:col-span-2">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Unit Size (Carpet Area)
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
                          flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200
                          ${isSelected 
                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                            : 'bg-white border-border text-text-body hover:border-slate-300 hover:text-text-heading'}
                        `}>
                          <span>{size}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Floor Plan */}
              <div className="space-y-4 md:col-span-2 pt-4 border-t border-slate-100">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Floor Plan Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {["2 BHK Elite", "3 BHK Premium", "3 BHK Luxury", "Custom Plan"].map((planName) => (
                    <label key={planName} className="cursor-pointer relative group">
                      <input 
                        type="radio" 
                        name="floorPlan" 
                        className="peer sr-only" 
                        checked={draftData.flat.plan === planName}
                        onChange={() => handlePlanChange(planName)}
                      />
                      <div className="rounded-2xl border-2 border-transparent overflow-hidden transition-all
                                      peer-checked:border-primary peer-checked:shadow-md bg-slate-50 border-slate-200 hover:border-slate-300">
                        <div className="h-28 bg-white flex items-center justify-center p-3 relative">
                          <img src="https://images.unsplash.com/photo-1600607688069-ce4d0b0b8cde?auto=format&fit=crop&w=300&q=80" alt="Plan" className="w-full h-full object-cover rounded-lg opacity-80" />
                          <div className="absolute inset-0 bg-primary/0 peer-checked:bg-primary/10 transition-colors"></div>
                        </div>
                        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                          <p className={`text-xs font-bold ${draftData.flat.plan === planName ? "text-primary" : "text-text-heading"}`}>
                            {planName}
                          </p>
                          {draftData.flat.plan === planName && <FiCheck className="w-4 h-4 text-primary" />}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </form>

      </div>
    </AssignUnitLayout>
  );
}
