import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiLoader } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjectSetup } from "../../context/ProjectSetupContext";

const STATUS_LABELS = {
  under_construction: "Under Construction",
  pre_launch: "Pre-Launch",
  ready: "Ready to Move",
};

export default function ReviewSetupPage() {
  const navigate = useNavigate();
  const { data, submitProject } = useProjectSetup();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const towers = data.towers || [];
  const configurations = data.configurations || [];

  const totalUnits = towers.reduce((n, t) => {
    const floors = parseInt(t.floors) || 0;
    const upf = parseInt(t.unitsPerFloor) || 0;
    return n + floors * upf;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitProject();
      navigate("/projects/new/complete");
    } catch (err) {
      setError(err?.message || "Failed to save project. Please try again.");
      setSubmitting(false);
    }
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

          {/* ── Project Info Card ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">Project Info</h3>
              <button
                type="button"
                onClick={() => navigate("/projects/new")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Project Name</p>
                <p className="text-sm font-medium text-text-heading">{data.name || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Status</p>
                <p className="text-sm font-medium text-text-heading">{STATUS_LABELS[data.projectStatus] || "—"}</p>
              </div>
            </div>
          </div>

          {/* ── Tower Info Cards ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">
                Towers ({towers.length})
              </h3>
              <button
                type="button"
                onClick={() => navigate("/projects/new/towers")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5 space-y-4">
              {towers.length === 0 && (
                <p className="text-sm text-text-muted">No towers added.</p>
              )}
              {towers.map((t, i) => {
                const floors = parseInt(t.floors) || 0;
                const upf = parseInt(t.unitsPerFloor) || 0;
                return (
                  <div key={i} className="grid grid-cols-3 gap-y-2 gap-x-6">
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Tower Name</p>
                      <p className="text-sm font-medium text-text-heading">{t.name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Floors</p>
                      <p className="text-sm font-medium text-text-heading">{floors}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Units / Floor</p>
                      <p className="text-sm font-medium text-text-heading">{upf}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Configuration Cards ── */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-semibold text-text-heading">
                Configurations ({configurations.length})
              </h3>
              <button
                type="button"
                onClick={() => navigate("/projects/new/units")}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="p-5 space-y-4">
              {configurations.length === 0 && (
                <p className="text-sm text-text-muted">No configurations added.</p>
              )}
              {configurations.map((c, i) => {
                const sizes = (c.sizes || [])
                  .filter((s) => s.area !== "" && s.area != null)
                  .map((s) => `${s.area} ${s.unit || "Sq. Ft."}`)
                  .join(", ");
                const facing = (c.facing || []).join(", ");
                return (
                  <div key={i} className="grid grid-cols-2 gap-y-2 gap-x-6">
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Unit Type</p>
                      <p className="text-sm font-medium text-text-heading">{c.bhk || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Facing</p>
                      <p className="text-sm font-medium text-text-heading">{facing || "—"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Sizes</p>
                      <p className="text-sm font-medium text-text-heading">{sizes || "—"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Summary Line ── */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate-50 rounded-xl border border-border mt-2">
            <div>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">BHK Types</p>
              <p className="text-base font-bold text-text-heading">{configurations.length}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Total Units</p>
              <p className="text-base font-bold text-primary">{totalUnits}</p>
            </div>
          </div>

          {/* ── Error Message ── */}
          {error && (
            <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* ── Action Buttons ── */}
          <div className="pt-6 mt-4 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects/new/units")}
              disabled={submitting}
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6
                         rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                         hover:border-slate-300 hover:text-text-heading hover:-translate-x-px
                         active:translate-x-0 active:scale-[0.99]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3.5 px-8
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         transition-all duration-300 cursor-pointer"
            >
              {submitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Confirm &amp; Save Project</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
