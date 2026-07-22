import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import AssignUnitLayout from "../../components/AssignUnitLayout";
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
    <AssignUnitLayout
      currentStep={2}
      projectId={id}
      projectName={project.name}
      title="Assign Unit"
      subtitle={`Step 2: Select Flat in ${tower.name}`}
      hideNext={true}
    >
      <div className="animate-fade-in w-full max-w-6xl">
        
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Select Flat
            </h2>
            <p className="text-sm text-text-muted">
              Choose the specific unit to assign to the buyer.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
            <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-text-heading text-xs font-bold tracking-wider uppercase transition-colors">All</button>
            <button className="px-4 py-1.5 rounded-lg text-primary text-xs font-bold tracking-wider uppercase hover:bg-primary/5 transition-colors">Available</button>
            <button className="px-4 py-1.5 rounded-lg text-slate-500 text-xs font-bold tracking-wider uppercase hover:bg-slate-200 transition-colors">Booked</button>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-8 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="w-5 h-5 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search flat number..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                       placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                       focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* ── Floor Grid ── */}
        <div className="space-y-10">
          {tower.floors.map((floor) => (
            <div key={floor.floorNumber} className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-text-heading">
                  {floor.floorNumber === 1 ? "1st" : floor.floorNumber === 2 ? "2nd" : floor.floorNumber === 3 ? "3rd" : `${floor.floorNumber}th`} Floor 
                </h3>
                <span className="text-sm font-semibold bg-slate-50 text-text-muted px-3 py-1 rounded-lg border border-slate-100">
                  {floor.units.length} units
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {floor.units.map(unit => {
                  const isAvailable = unit.status === "available";
                  const isSelected = selectedUnitForAnimation === unit.no;

                  return (
                    <button
                      key={unit.no}
                      disabled={!isAvailable || selectedUnitForAnimation !== null}
                      onClick={() => handleSelectFlat(unit)}
                      className={`
                        flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-500 ease-out relative overflow-hidden h-28
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

                      <span className={`text-xl font-bold mb-1 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSelected ? 'opacity-0 -translate-y-4 scale-90' : 'opacity-100 translate-y-0 scale-100 text-text-heading'}`}>
                        {unit.no}
                      </span>
                      <div className={`flex flex-col items-center gap-0.5 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 ${isSelected ? 'opacity-0 -translate-y-4 scale-90' : 'opacity-100 translate-y-0 scale-100'}`}>
                         <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                           {unit.type}
                         </span>
                         <span className="text-[10px] font-semibold text-text-placeholder uppercase">
                           {unit.facing}
                         </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </AssignUnitLayout>
  );
}
