import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight, FiGrid } from "react-icons/fi";
import AssignUnitLayout from "../../components/AssignUnitLayout";
import { useProjects } from "../../context/ProjectContext";
import { useAssignUnit } from "../../context/AssignUnitContext";

export default function AssignUnitTowerPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProject } = useProjects();
  const { setFlatSelection, assignData } = useAssignUnit();

  const project = getProject(id);

  if (!project) return <div>Project not found</div>;

  const handleSelectTower = (tower) => {
    setFlatSelection(id, { id: tower.id, name: tower.name }, null);
    navigate(`/projects/${id}/assign/flat`);
  };

  const selectedTowerId = assignData?.tower?.id;

  return (
    <AssignUnitLayout
      currentStep={1}
      projectId={id}
      projectName={project.name}
      title="Assign Unit"
      subtitle="Step 1: Select Tower"
      hideNext={true}
      hideBack={true}
    >
      <div className="animate-fade-in w-full max-w-5xl">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Select Tower
            </h2>
            <p className="text-sm text-text-muted">
              Choose the tower or block where the unit is located.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiGrid className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Total Towers</p>
              <p className="text-lg font-bold text-primary leading-none">{project.towers.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.towers.map(tower => {
            const isSelected = tower.id === selectedTowerId;
            return (
              <button
                key={tower.id}
                onClick={() => handleSelectTower(tower)}
                className={`group flex flex-col p-6 rounded-2xl border transition-all text-left cursor-pointer
                            ${isSelected 
                              ? "bg-primary/5 border-primary shadow-sm" 
                              : "bg-white border-border hover:border-primary/40 hover:shadow-md"}`}
              >
                <div className="flex justify-between items-start w-full mb-6">
                  <h4 className={`text-lg font-bold ${isSelected ? "text-primary" : "text-text-heading"}`}>
                    {tower.name}
                  </h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                                   ${isSelected ? "bg-primary text-white" : "bg-slate-50 text-text-muted group-hover:bg-primary/10 group-hover:text-primary"}`}>
                    <FiChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full mt-auto">
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-lg font-bold text-text-heading leading-none mb-1">{tower.totalUnits}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100/50">
                    <p className="text-lg font-bold text-amber-600 leading-none mb-1">{tower.soldUnits}</p>
                    <p className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">Sold</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100/50">
                    <p className="text-lg font-bold text-green-600 leading-none mb-1">{tower.availableUnits}</p>
                    <p className="text-[10px] font-bold text-green-700/60 uppercase tracking-wider">Avail</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AssignUnitLayout>
  );
}
