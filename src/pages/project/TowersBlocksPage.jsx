import { useState } from "react";
import { FiMoreVertical, FiPlus, FiTrash2, FiGrid } from "react-icons/fi";
import ProjectSetupLayout from "../../components/ProjectSetupLayout";

export default function TowersBlocksPage() {
  const [towers, setTowers] = useState([
    { id: 1, name: "Tower A", floors: "12", unitsPerFloor: "4" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTower = () => {
    setTowers([...towers, { id: Date.now(), name: "", floors: "", unitsPerFloor: "" }]);
  };

  const handleRemoveTower = (id) => {
    if (towers.length > 1) {
      setTowers(towers.filter(t => t.id !== id));
    }
  };

  const handleTowerChange = (id, field, value) => {
    setTowers(towers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      document.getElementById("btn-setup-next").click();
    }, 500);
  };

  const totalProjectUnits = towers.reduce((acc, tower) => {
    const floors = parseInt(tower.floors) || 0;
    const units = parseInt(tower.unitsPerFloor) || 0;
    return acc + (floors * units);
  }, 0);

  return (
    <ProjectSetupLayout
      currentStep={3}
      formId="towers-form"
      isSubmitting={isSubmitting}
      title="Setup Project"
      subtitle="Step 3: Towers & Blocks"
    >
      <div className="animate-fade-in w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Towers &amp; Blocks
            </h2>
            <p className="text-sm text-text-muted">
              Add towers or blocks. You can configure detailed unit configurations in the next step.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiGrid className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Total Units</p>
              <p className="text-lg font-bold text-primary leading-none">{totalProjectUnits}</p>
            </div>
          </div>
        </div>

        <form id="towers-form" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* ── Repeatable Tower Cards ── */}
            {towers.map((tower, index) => {
              const floors = parseInt(tower.floors) || 0;
              const unitsPerFloor = parseInt(tower.unitsPerFloor) || 0;
              const totalUnits = floors * unitsPerFloor;

              return (
                <div key={tower.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col group hover:border-primary/30 transition-colors">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-text-heading">
                      Tower {index + 1}
                    </h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {towers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTower(tower.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-md"
                          aria-label="Remove Tower"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button type="button" className="p-1.5 text-slate-400 hover:text-text-heading hover:bg-slate-200 transition-colors rounded-md">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col gap-5">
                    
                    {/* Tower Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Tower Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tower.name}
                        onChange={(e) => handleTowerChange(tower.id, "name", e.target.value)}
                        placeholder="e.g. Tower A"
                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                                   placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                   focus:border-primary transition-all shadow-sm"
                      />
                    </div>

                    {/* Side-by-side: Floors & Units */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Floors *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={tower.floors}
                          onChange={(e) => handleTowerChange(tower.id, "floors", e.target.value)}
                          placeholder="e.g. 24"
                          className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                                     placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                     focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Units/Floor *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={tower.unitsPerFloor}
                          onChange={(e) => handleTowerChange(tower.id, "unitsPerFloor", e.target.value)}
                          placeholder="e.g. 4"
                          className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                                     placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                     focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Computed Total Line */}
                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between text-sm bg-slate-50 px-4 py-3 rounded-xl border border-border">
                        <span className="font-semibold text-text-muted">Tower Total</span>
                        <span className="font-bold text-text-heading">{totalUnits} Units</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* ── Add More Button Card ── */}
            <button
              type="button"
              onClick={handleAddTower}
              className="flex flex-col items-center justify-center gap-3 min-h-[300px]
                         rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50
                         text-slate-400 hover:text-primary
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                <FiPlus className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-text-heading">Add Another Tower</span>
              <span className="text-xs text-text-muted text-center max-w-[200px]">Create an additional block or tower configuration</span>
            </button>
          </div>

        </form>
      </div>
    </ProjectSetupLayout>
  );
}
