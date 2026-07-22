import { useState } from "react";
import { FiCheck, FiMapPin, FiLayers, FiGrid, FiHome, FiEdit2 } from "react-icons/fi";
import ProjectSetupLayout from "../../components/ProjectSetupLayout";

export default function ReviewSetupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate success and navigate to complete/dashboard
      window.location.href = "/projects";
    }, 1000);
  };

  const handleEdit = (step) => {
    // In a real app with layout context, you would update the active step
    // For now, this is just a dummy action or could simulate back clicks
    console.log("Edit step:", step);
  };

  return (
    <ProjectSetupLayout
      currentStep={5}
      formId="review-form"
      isSubmitting={isSubmitting}
      title="Setup Project"
      subtitle="Step 5: Review & Confirm"
    >
      <div className="animate-fade-in w-full max-w-5xl">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Review &amp; Confirm
            </h2>
            <p className="text-sm text-text-muted">
              Verify your project details before publishing. Click edit on any section to make changes.
            </p>
          </div>
        </div>

        <form id="review-form" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* ── Left Column: Core & Location ── */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Core Details */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiHome className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Core Details</h3>
                  </div>
                  <button type="button" onClick={() => handleEdit(1)} className="p-1 text-slate-400 hover:text-primary transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Project Name</p>
                    <p className="text-sm font-semibold text-text-heading">Skyline Heights</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Type &amp; Status</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold bg-slate-100 text-text-heading px-2.5 py-1 rounded-md">Apartments</span>
                      <span className="text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-md">Under Construction</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">RERA Number</p>
                    <p className="text-sm font-medium text-text-heading font-mono text-slate-600">P51900045872</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Location</h3>
                  </div>
                  <button type="button" onClick={() => handleEdit(2)} className="p-1 text-slate-400 hover:text-primary transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center border border-border">
                    <FiMapPin className="w-8 h-8 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm font-medium text-text-heading leading-relaxed">
                      Survey No. 45/2, Bandra West<br/>
                      Near Metro Station<br/>
                      Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right Column: Towers & Units ── */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Towers & Blocks */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiGrid className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Towers &amp; Blocks</h3>
                  </div>
                  <button type="button" onClick={() => handleEdit(3)} className="p-1 text-slate-400 hover:text-primary transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-border">
                        <th className="px-5 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">Tower Name</th>
                        <th className="px-5 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider text-center">Floors</th>
                        <th className="px-5 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider text-center">Units/Floor</th>
                        <th className="px-5 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 text-sm font-semibold text-text-heading">Tower A</td>
                        <td className="px-5 py-3 text-sm font-medium text-text-body text-center">30</td>
                        <td className="px-5 py-3 text-sm font-medium text-text-body text-center">10</td>
                        <td className="px-5 py-3 text-sm font-bold text-text-heading text-right">300</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 text-sm font-semibold text-text-heading">Tower B</td>
                        <td className="px-5 py-3 text-sm font-medium text-text-body text-center">25</td>
                        <td className="px-5 py-3 text-sm font-medium text-text-body text-center">8</td>
                        <td className="px-5 py-3 text-sm font-bold text-text-heading text-right">200</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-5 py-4 bg-slate-50 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-bold text-text-muted">Total Project Units</span>
                    <span className="text-lg font-black text-primary">500</span>
                  </div>
                </div>
              </div>

              {/* Unit Configurations */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiLayers className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Unit Configurations</h3>
                  </div>
                  <button type="button" onClick={() => handleEdit(4)} className="p-1 text-slate-400 hover:text-primary transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="border border-border rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-lg">2 BHK</span>
                      <span className="text-xs font-semibold text-text-muted">Series 01, 02</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Sizes</p>
                        <p className="text-sm font-medium text-text-heading">850, 920 Sq. Ft.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                        <p className="text-sm font-medium text-text-heading">North, East</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-lg">3 BHK</span>
                      <span className="text-xs font-semibold text-text-muted">Series 03, 04</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Sizes</p>
                        <p className="text-sm font-medium text-text-heading">1250 Sq. Ft.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                        <p className="text-sm font-medium text-text-heading">South</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </ProjectSetupLayout>
  );
}
