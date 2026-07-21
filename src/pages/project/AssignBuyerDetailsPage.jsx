import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignBuyerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/assign/booking-details`);
  };

  const handleChange = (e) => {
    updateDraft("buyer", { [e.target.name]: e.target.value });
  };

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
            Buyer Details
          </h2>
          <p className="text-sm text-text-muted">
            Enter the buyer and booking details to assign this unit.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-5 space-y-5 shadow-sm glass-card">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">Full Name *</label>
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

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">Phone Number *</label>
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

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">Email ID *</label>
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

            {/* Add Co-applicant Toggle */}
            {!draftData.buyer.hasCoApplicant ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => updateDraft("buyer", { hasCoApplicant: true })}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4
                             rounded-xl border-2 border-dashed border-slate-300 bg-white
                             text-sm font-semibold text-text-muted hover:text-text-heading
                             hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Co-applicant</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-border/60 animate-fade-in space-y-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-text-heading uppercase tracking-wide">Co-applicant Details</h3>
                  <button
                    type="button"
                    onClick={() => updateDraft("buyer", { hasCoApplicant: false, coApplicantName: "", coApplicantPhone: "", coApplicantEmail: "" })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all duration-200"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-medium text-text-heading">Full Name *</label>
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

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-heading">Phone Number *</label>
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

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-heading">Email ID *</label>
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
              onClick={() => navigate(`/projects/${id}/assign/unit-details`)}
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                         hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              Back to Unit Details
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
