import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { api } from "../../api/client";

export default function AssignUnitTowerPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    api.get(`/partner/builder-projects/${id}/`)
      .then((data) => { if (alive) setProject(data); })
      .catch((err) => { if (alive) setError(err.message || "Failed to load project."); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div className="p-8 text-sm text-text-muted">Loading…</div>;
  if (error) return <div className="p-8 text-sm text-red-600">{error}</div>;
  if (!project) return <div>Project not found</div>;

  const towers = project.towers || [];

  const handleSelectTower = (tower) => {
    navigate(`/projects/${id}/assign/flat`, { state: { tower: { id: tower.id, name: tower.name } } });
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Assign Unit"
      topBarSubtitle={project.name}
    >
      <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
        
        {/* ── Header ── */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
            Assign Unit
          </h2>
          <p className="text-sm text-text-muted">
            Enter the buyer and booking details to assign this unit.
          </p>
        </div>

        {/* ── Step Content ── */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-heading px-1 mb-2">Select Tower</h3>
          
          <div className="grid gap-3">
            {towers.length === 0 && (
              <div className="p-5 bg-white border border-border rounded-xl text-sm text-text-muted text-center">
                No towers available for this project.
              </div>
            )}
            {towers.map(tower => (
              <button
                key={tower.id}
                onClick={() => handleSelectTower(tower)}
                className="group flex items-center justify-between p-5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-md transition-all text-left cursor-pointer"
              >
                <div>
                  <h4 className="text-base font-bold text-text-heading mb-1">{tower.name}</h4>
                  <div className="flex gap-4 text-xs">
                    <div><span className="font-semibold text-text-heading">{tower.total_units}</span> <span className="text-text-muted">Total Units</span></div>
                    <div><span className="font-semibold text-primary">{tower.floors}</span> <span className="text-text-muted">Floors</span></div>
                    <div><span className="font-semibold text-primary">{tower.units_per_floor}</span> <span className="text-text-muted">Per Floor</span></div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <FiChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}`)}
            className="w-full flex items-center justify-center py-3.5 px-6
                       rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                       hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       transition-all duration-300 cursor-pointer"
          >
            Back to Project
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
