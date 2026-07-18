import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignReviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { draftData, submitAssignment } = useAssignUnit();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!draftData.flat) return <div>Invalid selection</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await submitAssignment();
      navigate(`/projects/${id}/assign/complete`, {
        state: {
          buyerName: draftData.buyer.fullName,
          flat: draftData.flat,
          tower: draftData.tower,
        },
      });
    } catch (err) {
      setError(err.message || "Failed to assign unit. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Assign Unit"
      topBarSubtitle={draftData.tower.name}
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
            Review Details
          </h2>
          <p className="text-sm text-text-muted">
            Enter the buyer and booking details to assign this unit.
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Unit Details Card */}
          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm glass-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Unit Details</h3>
              <button 
                type="button" 
                onClick={() => navigate(`/projects/${id}/assign/unit-details`)}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Flat No.</p>
                <p className="text-sm font-medium text-text-heading">{draftData.flat.no}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">BHK Type</p>
                <p className="text-sm font-medium text-text-heading">{draftData.flat.type}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Size</p>
                <p className="text-sm font-medium text-text-heading">{draftData.flat.size}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                <p className="text-sm font-medium text-text-heading">{draftData.flat.facing}</p>
              </div>
              <div className="col-span-2 sm:col-span-4 mt-1">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Floor Plan</p>
                <p className="text-sm font-medium text-text-heading">{draftData.flat.plan}</p>
              </div>
            </div>
          </div>

          {/* Buyer Details Card */}
          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm glass-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Buyer Details</h3>
              <button 
                type="button" 
                onClick={() => navigate(`/projects/${id}/assign/buyer-details`)}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-medium text-text-heading">{draftData.buyer.fullName}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-text-heading">{draftData.buyer.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-text-heading">{draftData.buyer.email}</p>
              </div>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm glass-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Booking Details</h3>
              <button 
                type="button" 
                onClick={() => navigate(`/projects/${id}/assign/booking-details`)}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Booking Date</p>
                <p className="text-sm font-medium text-text-heading">{draftData.booking.date}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Amount</p>
                <p className="text-sm font-bold text-text-heading">₹{draftData.booking.amount}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Notes</p>
                <p className="text-sm font-medium text-text-heading">{draftData.booking.notes || "--"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {error && (
              <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cursor-pointer
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? "Assigning…" : "Confirm & Assign Unit"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => navigate(`/projects/${id}/assign/booking-details`)}
              className="w-full flex items-center justify-center py-3.5 px-6
                         rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                         hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              Back to Booking Details
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
