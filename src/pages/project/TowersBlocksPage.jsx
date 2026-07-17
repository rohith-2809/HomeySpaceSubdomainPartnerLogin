import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMoreVertical, FiPlus, FiArrowRight, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";

export default function TowersBlocksPage() {
  const navigate = useNavigate();

  // State to hold the repeatable towers
  const [towers, setTowers] = useState([
    { id: 1, name: "", floors: "", unitsPerFloor: "" }
  ]);

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
    navigate("/projects/new/units");
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Setup Project"
      topBarSubtitle="Step 3 of 4"
    >
      <div className="max-w-[640px] mx-auto animate-fade-in">
        
        {/* ── Heading ── */}
        <div className="mb-8 space-y-1.5">
          <h2 className="text-2xl font-bold text-text-heading tracking-tight">
            Towers &amp; Blocks
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Add towers or blocks for this project. You can configure detailed unit configurations in the next step.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Repeatable Tower Cards ── */}
          <div className="space-y-5">
            {towers.map((tower, index) => {
              const floors = parseInt(tower.floors) || 0;
              const unitsPerFloor = parseInt(tower.unitsPerFloor) || 0;
              const totalUnits = floors * unitsPerFloor;

              return (
                <div key={tower.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-semibold text-text-heading">
                      Tower {index + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {towers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTower(tower.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-md"
                          aria-label="Remove Tower"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button type="button" className="p-1.5 text-slate-400 hover:text-text-heading transition-colors rounded-md">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-5">
                    
                    {/* Tower Name */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text-heading">
                        Tower Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tower.name}
                        onChange={(e) => handleTowerChange(tower.id, "name", e.target.value)}
                        placeholder="e.g. Tower A"
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                   placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                   focus:border-primary transition-all"
                      />
                    </div>

                    {/* Side-by-side: Floors & Units */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-heading">
                          No. of Floors *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={tower.floors}
                          onChange={(e) => handleTowerChange(tower.id, "floors", e.target.value)}
                          placeholder="e.g. 24"
                          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                     placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                     focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-heading">
                          Units per Floor *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={tower.unitsPerFloor}
                          onChange={(e) => handleTowerChange(tower.id, "unitsPerFloor", e.target.value)}
                          placeholder="e.g. 4"
                          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                     placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                     focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Computed Total Line */}
                    <div className="pt-2">
                      <p className="text-sm font-medium text-text-muted bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
                        Total Units: <span className="font-semibold text-text-heading">{totalUnits} Units</span>
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Add More Button ── */}
          <div>
            <button
              type="button"
              onClick={handleAddTower}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4
                         rounded-xl border-2 border-dashed border-slate-300 bg-white
                         text-sm font-semibold text-text-muted hover:text-text-heading
                         hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add more towers</span>
            </button>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-6 mt-4 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects/new/location")}
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6
                         rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                         hover:border-slate-300 hover:text-text-heading hover:-translate-x-px
                         active:translate-x-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3.5 px-8
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cursor-pointer"
            >
              <span>Next Step</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
