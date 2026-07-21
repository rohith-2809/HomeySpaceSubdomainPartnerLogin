import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiFolder,
  FiChevronRight,
  FiFileText,
  FiImage,
} from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";

/* ── Mock floor plans per tower ── */
const INITIAL_PLANS = {
  "tower-a": [
    { id: 1, name: "2 BHK Elite — Floor 1-12",    size: "1,250 sq.ft", file: "2BHK_Elite_v2.pdf",    type: "pdf" },
    { id: 2, name: "3 BHK Premium — Floor 1-12",  size: "1,450 sq.ft", file: "3BHK_Premium_v1.pdf",  type: "pdf" },
    { id: 3, name: "3 BHK Luxury — Floor 13-24",  size: "1,800 sq.ft", file: "3BHK_Luxury_v1.pdf",   type: "pdf" },
  ],
  "tower-b": [
    { id: 1, name: "2 BHK Elite — Floor 1-8",     size: "1,250 sq.ft", file: "2BHK_Elite_B.pdf",    type: "pdf" },
    { id: 2, name: "3 BHK Standard — Floor 1-8",  size: "1,400 sq.ft", file: "3BHK_Std_B.pdf",      type: "pdf" },
  ],
};

/* get plan count for a tower id */
const planCount = (towerId) => (INITIAL_PLANS[towerId] || []).length;

/* ── Floor Plan File Row ── */
function PlanRow({ plan, delay = 0 }) {
  const isPdf = plan.type === "pdf";
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors duration-150 cursor-pointer group animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          isPdf ? "bg-red-50" : "bg-violet-50"
        }`}
      >
        {isPdf ? (
          <FiFileText className="w-5 h-5 text-red-500" />
        ) : (
          <FiImage className="w-5 h-5 text-violet-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-heading truncate">{plan.name}</p>
        <p className="text-xs text-text-muted mt-0.5">{plan.file} • {plan.size}</p>
      </div>
      <FiChevronRight className="w-4 h-4 text-text-placeholder shrink-0 group-hover:text-primary transition-colors" />
    </div>
  );
}

/* ── Tower Section ── */
function TowerSection({ tower, plans, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300`}
    >
      {/* Tower row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        {/* Folder icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary"
          }`}
        >
          <FiFolder className="w-5 h-5" />
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold text-text-heading">{tower.name}</p>
          <p className="text-xs text-text-muted mt-0.5">
            {plans.length} {plans.length === 1 ? "Plan" : "Plans"}
          </p>
        </div>

        <FiChevronRight
          className={`w-4 h-4 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Expanded plan list */}
      {isOpen && plans.length > 0 && (
        <div className="border-t border-slate-100">
          {plans.map((plan, i) => (
            <div key={plan.id}>
              <PlanRow plan={plan} delay={i * 50} />
              {i < plans.length - 1 && (
                <div className="h-px bg-slate-100 mx-5" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state inside tower */}
      {isOpen && plans.length === 0 && (
        <div className="border-t border-slate-100 px-5 py-8 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <FiFileText className="w-5 h-5 text-text-muted" />
          </div>
          <p className="text-sm text-text-muted">No floor plans added yet</p>
          <button className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
            + Upload Plan
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function FloorPlansPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id);

  /* which tower sections are expanded */
  const [openTowers, setOpenTowers] = useState({});

  /* local plans state (seeded from mock) */
  const [plans] = useState(INITIAL_PLANS);

  if (!project) return <div>Project not found</div>;

  const towers = project.towers || [];
  const totalPlans = towers.reduce(
    (acc, t) => acc + (plans[t.id] || []).length,
    0
  );

  const toggleTower = (towerId) => {
    setOpenTowers((prev) => ({ ...prev, [towerId]: !prev[towerId] }));
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Floor Plans"
      topBarSubtitle={`${totalPlans} plan${totalPlans !== 1 ? "s" : ""} available`}
    >
      <div className="max-w-2xl mx-auto animate-fade-in">

        {/* ── Page heading ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-heading tracking-tight">
            Floor Plans
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Layout sets organised per tower
          </p>
        </div>

        {/* ── Section label ── */}
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 px-0.5">
          Towers
        </p>

        {/* ── Tower list ── */}
        {towers.length > 0 ? (
          <div className="space-y-3">
            {towers.map((tower, i) => (
              <div
                key={tower.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <TowerSection
                  tower={tower}
                  plans={plans[tower.id] || []}
                  isOpen={!!openTowers[tower.id]}
                  onToggle={() => toggleTower(tower.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state — no towers configured */
          <div className="py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FiFolder className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-text-heading">
                No towers configured
              </p>
              <p className="text-sm text-text-muted max-w-xs">
                Add towers to this project first before uploading floor plans.
              </p>
            </div>
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              Configure Towers
            </button>
          </div>
        )}

        {/* ── Upload FAB ── */}
        <button
          className="fixed bottom-8 right-6 sm:right-8 w-14 h-14 rounded-full bg-primary text-white
                     flex items-center justify-center shadow-xl shadow-primary/30
                     hover:bg-primary-hover hover:shadow-2xl hover:shadow-primary/40
                     hover:-translate-y-0.5 active:translate-y-0 active:scale-95
                     transition-all duration-200 cursor-pointer z-30"
          aria-label="Upload floor plan"
        >
          <FiPlus className="w-6 h-6" />
        </button>
        {/* ── Bottom Back Button ── */}
        <div className="pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}`)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6
                       rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                       hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       transition-all duration-300 cursor-pointer group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to Project
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
