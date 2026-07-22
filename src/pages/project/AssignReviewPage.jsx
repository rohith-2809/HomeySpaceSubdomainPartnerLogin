import { useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiEdit2, FiHome, FiUser, FiCalendar } from "react-icons/fi";
import AssignUnitLayout from "../../components/AssignUnitLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";
import { useProjects } from "../../context/ProjectContext";

export default function AssignReviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, clearDraft } = useAssignUnit();
  const { assignUnit, getProject } = useProjects();

  const project = getProject(id);

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Commit the draft data to the mock project database
    assignUnit(id, draftData.tower.id, draftData.flat.id);
    
    // Save buyer name temporarily for the complete page via query param or just let it pass,
    // Since we clear draft, we should probably pass it in state
    navigate(`/projects/${id}/assign/complete`, { state: { buyerName: draftData.buyer.fullName, flat: draftData.flat.no, tower: draftData.tower.name }});
    clearDraft();
  };

  return (
    <AssignUnitLayout
      currentStep={6}
      projectId={id}
      projectName={project?.name || "Project"}
      title="Assign Unit"
      subtitle="Step 6: Review Details"
      formId="review-assign-form"
      nextLabel="Confirm & Assign Unit"
    >
      <div className="animate-fade-in w-full max-w-5xl">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Review &amp; Confirm
            </h2>
            <p className="text-sm text-text-muted">
              Verify all details before finalizing the unit assignment.
            </p>
          </div>
        </div>

        {/* ── Summary Cards ── */}
        <form id="review-assign-form" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Unit */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiHome className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Unit Details</h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => navigate(`/projects/${id}/assign/unit-details`)}
                    className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Tower &amp; Flat No.</p>
                    <p className="text-sm font-semibold text-text-heading">{draftData.tower.name} — Flat {draftData.flat.no}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">BHK Type</p>
                      <p className="text-sm font-medium text-text-heading">{draftData.flat.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Size</p>
                      <p className="text-sm font-medium text-text-heading">{draftData.flat.size}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                      <p className="text-sm font-medium text-text-heading">{draftData.flat.facing}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Floor Plan</p>
                      <p className="text-sm font-medium text-text-heading">{draftData.flat.plan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Buyer & Booking */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Buyer Details */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Buyer Details</h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => navigate(`/projects/${id}/assign/buyer-details`)}
                    className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Primary Applicant</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Name</p>
                          <p className="text-sm font-semibold text-text-heading">{draftData.buyer.fullName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Contact</p>
                          <p className="text-sm font-medium text-text-heading">{draftData.buyer.phone}</p>
                          <p className="text-xs text-text-muted mt-0.5">{draftData.buyer.email}</p>
                        </div>
                      </div>
                    </div>

                    {draftData.buyer.hasCoApplicant && (
                      <div className="pt-4 sm:pt-0 sm:pl-5 sm:border-l border-border">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Co-applicant</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Name</p>
                            <p className="text-sm font-semibold text-text-heading">{draftData.buyer.coApplicantName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Contact</p>
                            <p className="text-sm font-medium text-text-heading">{draftData.buyer.coApplicantPhone}</p>
                            <p className="text-xs text-text-muted mt-0.5">{draftData.buyer.coApplicantEmail}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-heading">Booking Details</h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => navigate(`/projects/${id}/assign/booking-details`)}
                    className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Booking Date</p>
                    <p className="text-sm font-medium text-text-heading">
                      {draftData.booking.date ? new Date(draftData.booking.date).toLocaleDateString() : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Booking Amount</p>
                    <p className="text-sm font-bold text-emerald-600">₹{draftData.booking.amount}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-sm font-medium text-text-heading bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {draftData.booking.notes || "No additional notes provided."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </form>

      </div>
    </AssignUnitLayout>
  );
}
