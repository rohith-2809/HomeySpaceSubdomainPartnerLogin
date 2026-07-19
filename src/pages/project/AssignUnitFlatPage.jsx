import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
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

  const [selectedUnitForAnimation, setSelectedUnitForAnimation] = useState(null);

  const handleSelectFlat = (unit) => {
    setSelectedUnitForAnimation(unit.no);
    
    setTimeout(() => {
      setFlatSelection(id, draftData.tower, unit);
      navigate(`/projects/${id}/assign/unit-details`);
    }, 650); // 650ms to let the premium animation finish
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
                  const isSelected = selectedUnitForAnimation === unit.no;

                  return (
                    <button
                      key={unit.no}
                      disabled={!isAvailable || selectedUnitForAnimation !== null}
                      onClick={() => handleSelectFlat(unit)}
                      className={`
                        flex flex-col p-3 rounded-xl border text-left transition-all duration-500 ease-out relative overflow-hidden
                        ${isAvailable && !isSelected
                          ? "bg-white border-border hover:border-primary hover:shadow-md cursor-pointer group" 
                          : ""}
                        ${!isAvailable 
                          ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed" 
                          : ""}
                        ${isSelected 
                          ? "bg-primary border-primary shadow-lg ring-4 ring-primary/20 transform scale-[0.95]" 
                          : ""}
                      `}
                    >
                      {isAvailable && !isSelected && (
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden">
                        <div 
                          className={`absolute w-32 h-32 bg-white/20 rounded-full transition-all duration-700 ease-out
                                     ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
                        />
                        <div 
                          className={`
                            relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                            flex items-center justify-center w-11 h-11 bg-white/15 rounded-full backdrop-blur-sm border border-white/20
                            ${isSelected 
                              ? 'opacity-100 scale-100 translate-y-0 text-white shadow-2xl' 
                              : 'opacity-0 scale-[0.4] translate-y-8 text-primary'}
                          `}
                        >
                          <FaBuilding className="w-5 h-5 drop-shadow-md" />
                        </div>
                      </div>

                      <span className={`text-lg font-bold mb-1 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSelected ? 'opacity-0 -translate-y-4 scale-90' : 'opacity-100 translate-y-0 scale-100 text-text-heading'}`}>
                        {unit.no}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 ${isSelected ? 'opacity-0 -translate-y-4 scale-90' : 'opacity-100 translate-y-0 scale-100 text-text-muted'}`}>
                        {unit.type}
                      </span>
                      <span className={`text-[10px] relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-100 ${isSelected ? 'opacity-0 -translate-y-4 scale-90' : 'opacity-100 translate-y-0 scale-100 text-text-placeholder'}`}>
                        {unit.facing} facing
                      </span>
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
