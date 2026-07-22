import { useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiCalendar } from "react-icons/fi";
import AssignUnitLayout from "../../components/AssignUnitLayout";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useAssignUnit } from "../../context/AssignUnitContext";
import { useProjects } from "../../context/ProjectContext";

export default function AssignBookingDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();
  const { getProject } = useProjects();
  
  const project = getProject(id);

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/assign/review`);
  };

  const handleDateChange = (date) => updateDraft("booking", { date });
  const handleChange = (e) => updateDraft("booking", { [e.target.name]: e.target.value });

  return (
    <AssignUnitLayout
      currentStep={5}
      projectId={id}
      projectName={project?.name || "Project"}
      title="Assign Unit"
      subtitle="Step 5: Booking Details"
      formId="booking-details-form"
    >
      <div className="animate-fade-in w-full max-w-5xl">
        
        {/* ── Recap Info ── */}
        <div className="flex items-center gap-3 mb-6 bg-slate-50 border border-border px-5 py-3 rounded-xl inline-flex shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FiCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Selected Unit &amp; Buyer</p>
            <p className="text-sm font-bold text-text-heading leading-none">
              Flat {draftData.flat.no} • {draftData.buyer.fullName}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Booking Details
            </h2>
            <p className="text-sm text-text-muted">
              Enter the financial and date specifics for this assignment.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiCalendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Date</p>
              <p className="text-sm font-bold text-primary leading-none">
                {draftData.booking.date ? new Date(draftData.booking.date).toLocaleDateString() : "Pending"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <form id="booking-details-form" onSubmit={handleSubmit}>
          
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              <div className="space-y-1.5 max-w-sm">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Booking Date *</label>
                <div className="relative">
                  <CustomDatePicker 
                    value={draftData.booking.date} 
                    onChange={handleDateChange} 
                    placeholder="Select booking date" 
                  />
                </div>
              </div>

              <div className="space-y-1.5 max-w-sm">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Booking Amount *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center font-bold text-text-muted pointer-events-none">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="amount"
                    required
                    value={draftData.booking.amount}
                    onChange={handleChange}
                    placeholder="5,00,000"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm font-medium text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Additional Notes</label>
                <textarea
                  name="notes"
                  value={draftData.booking.notes}
                  onChange={handleChange}
                  placeholder="Add any specific payment terms, conditions, or references here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all resize-none shadow-sm"
                />
              </div>

            </div>
            
          </div>

        </form>

      </div>
    </AssignUnitLayout>
  );
}
