import { useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiPlus, FiTrash2, FiUser } from "react-icons/fi";
import AssignUnitLayout from "../../components/AssignUnitLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";
import { useProjects } from "../../context/ProjectContext";

export default function AssignBuyerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();
  const { getProject } = useProjects();

  const project = getProject(id);

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/assign/booking-details`);
  };

  const handleChange = (e) => {
    updateDraft("buyer", { [e.target.name]: e.target.value });
  };

  return (
    <AssignUnitLayout
      currentStep={4}
      projectId={id}
      projectName={project?.name || "Project"}
      title="Assign Unit"
      subtitle="Step 4: Buyer Details"
      formId="buyer-details-form"
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
              {draftData.tower?.name} — Flat {draftData.flat.no} ({draftData.flat.type})
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Buyer Details
            </h2>
            <p className="text-sm text-text-muted">
              Enter the primary applicant and optional co-applicant details.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiUser className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Applicants</p>
              <p className="text-sm font-bold text-primary leading-none">{draftData.buyer.hasCoApplicant ? "2" : "1"}</p>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <form id="buyer-details-form" onSubmit={handleSubmit}>
          
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            
            {/* Primary Applicant */}
            <div>
              <h3 className="text-sm font-bold text-text-heading uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Primary Applicant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2 max-w-xl">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={draftData.buyer.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={draftData.buyer.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={draftData.buyer.email}
                    onChange={handleChange}
                    placeholder="aarav.sharma@example.com"
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Add Co-applicant Toggle */}
            {!draftData.buyer.hasCoApplicant ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => updateDraft("buyer", { hasCoApplicant: true })}
                  className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6
                             rounded-xl border-2 border-dashed border-slate-300 bg-slate-50
                             text-sm font-bold text-text-muted hover:text-primary hover:border-primary/50
                             hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Co-applicant</span>
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-text-heading uppercase tracking-wider">Co-applicant Details</h3>
                  <button
                    type="button"
                    onClick={() => updateDraft("buyer", { hasCoApplicant: false, coApplicantName: "", coApplicantPhone: "", coApplicantEmail: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2 max-w-xl">
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="coApplicantName"
                      required={draftData.buyer.hasCoApplicant}
                      value={draftData.buyer.coApplicantName}
                      onChange={handleChange}
                      placeholder="e.g. Riya Sharma"
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                 placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                 focus:border-primary transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5 max-w-sm">
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      name="coApplicantPhone"
                      required={draftData.buyer.hasCoApplicant}
                      value={draftData.buyer.coApplicantPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                 placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                 focus:border-primary transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5 max-w-sm">
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Email ID *</label>
                    <input
                      type="email"
                      name="coApplicantEmail"
                      required={draftData.buyer.hasCoApplicant}
                      value={draftData.buyer.coApplicantEmail}
                      onChange={handleChange}
                      placeholder="riya.sharma@example.com"
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                 placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            
          </div>

        </form>

      </div>
    </AssignUnitLayout>
  );
}
