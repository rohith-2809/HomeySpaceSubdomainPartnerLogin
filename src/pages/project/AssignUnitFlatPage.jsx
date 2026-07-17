import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignUnitFlatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProject } = useProjects();
  const { draftData, setFlatSelection, updateDraft } = useAssignUnit();

  const project = getProject(id);
  const selectedTowerId = draftData?.tower?.id;
  const tower = project?.towers.find(t => t.id === selectedTowerId);

  if (!project || !tower) return <div>Invalid selection</div>;

  const handleSelectFlat = (unit) => {
    setFlatSelection(id, draftData.tower, unit);
    navigate(`/projects/${id}/assign/unit-details`);
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Assign Unit"
      topBarSubtitle={tower.name}
    >
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
        
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
              Select Flat
            </h2>
            <p className="text-sm text-text-muted">
              Enter the buyer and booking details to assign this unit.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-[11px] font-bold tracking-wider uppercase cursor-pointer shadow-sm">All</span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:bg-primary/20 transition-colors">Available</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:bg-slate-200 transition-colors">Booked</span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="w-4 h-4 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search flat number..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                       placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                       focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* ── Floor Grid ── */}
        <div className="space-y-8">
          {tower.floors.map((floor) => (
            <div key={floor.floorNumber}>
              <h3 className="text-sm font-bold text-text-heading mb-4 px-1 border-b border-border pb-2">
                {floor.floorNumber === 1 ? "1st" : floor.floorNumber === 2 ? "2nd" : floor.floorNumber === 3 ? "3rd" : `${floor.floorNumber}th`} Floor <span className="text-text-muted font-normal">· {floor.units.length} units</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {floor.units.map(unit => {
                  const isAvailable = unit.status === "available";
                  return (
                    <button
                      key={unit.no}
                      disabled={!isAvailable}
                      onClick={() => handleSelectFlat(unit)}
                      className={`
                        flex flex-col p-3 rounded-xl border text-left transition-all relative overflow-hidden
                        ${isAvailable 
                          ? "bg-white border-border hover:border-primary hover:shadow-md cursor-pointer group" 
                          : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"}
                      `}
                    >
                      {isAvailable && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      
                      <span className="text-lg font-bold text-text-heading mb-1 relative z-10">{unit.no}</span>
                      <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider relative z-10">{unit.type}</span>
                      <span className="text-[10px] text-text-placeholder relative z-10">{unit.facing} facing</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}/assign/tower`)}
            className="w-full sm:w-auto px-8 flex items-center justify-center py-3.5 mx-auto
                       rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                       hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       transition-all duration-300 cursor-pointer"
          >
            Back to Tower Selection
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
