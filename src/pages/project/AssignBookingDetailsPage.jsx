import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignBookingDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, updateDraft } = useAssignUnit();

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/assign/review`);
  };

  const handleDateChange = (date) => updateDraft("booking", { date });
  const handleChange = (e) => updateDraft("booking", { [e.target.name]: e.target.value });

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
            Booking Details
          </h2>
          <p className="text-sm text-text-muted">
            Enter the buyer and booking details to assign this unit.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-5 space-y-5 shadow-sm glass-card">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">Booking Date *</label>
                <CustomDatePicker 
                  value={draftData.booking.date} 
                  onChange={handleDateChange} 
                  placeholder="Select booking date" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">Booking Amount *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center font-medium text-text-muted pointer-events-none">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="amount"
                    required
                    value={draftData.booking.amount}
                    onChange={handleChange}
                    placeholder="5,00,000"
                    className="w-full pl-8 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">Additional Notes</label>
                <textarea
                  name="notes"
                  value={draftData.booking.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all resize-none shadow-sm"
                />
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
              onClick={() => navigate(`/projects/${id}/assign/buyer-details`)}
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                         hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              Back to Buyer Details
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
