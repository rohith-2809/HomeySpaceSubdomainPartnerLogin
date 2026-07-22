import { useState } from "react";
import { FiMoreVertical, FiPlus, FiTrash2, FiChevronDown, FiLayers } from "react-icons/fi";
import ProjectSetupLayout from "../../components/ProjectSetupLayout";

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FACING_OPTIONS = ["North", "East", "South", "West"];

export default function UnitsSetupPage() {
  const [configs, setConfigs] = useState([
    {
      id: 1,
      bhk: "3 BHK",
      sizes: [{ id: 1, area: "1250", unit: "Sq. Ft." }],
      facing: ["East"],
      numbering: "Series 01"
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddConfig = () => {
    setConfigs([...configs, {
      id: Date.now(),
      bhk: "2 BHK",
      sizes: [{ id: Date.now(), area: "", unit: "Sq. Ft." }],
      facing: [],
      numbering: ""
    }]);
  };

  const handleRemoveConfig = (id) => {
    if (configs.length > 1) setConfigs(configs.filter(c => c.id !== id));
  };

  const updateConfig = (id, field, value) => {
    setConfigs(configs.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleAddSize = (configId) => {
    setConfigs(configs.map(c => {
      if (c.id === configId) {
        return { ...c, sizes: [...c.sizes, { id: Date.now(), area: "", unit: "Sq. Ft." }] };
      }
      return c;
    }));
  };

  const handleRemoveSize = (configId, sizeId) => {
    setConfigs(configs.map(c => {
      if (c.id === configId && c.sizes.length > 1) {
        return { ...c, sizes: c.sizes.filter(s => s.id !== sizeId) };
      }
      return c;
    }));
  };

  const updateSize = (configId, sizeId, field, value) => {
    setConfigs(configs.map(c => {
      if (c.id === configId) {
        return {
          ...c,
          sizes: c.sizes.map(s => s.id === sizeId ? { ...s, [field]: value } : s)
        };
      }
      return c;
    }));
  };

  const toggleFacing = (configId, facingValue) => {
    setConfigs(configs.map(c => {
      if (c.id === configId) {
        const isSelected = c.facing.includes(facingValue);
        const newFacing = isSelected
          ? c.facing.filter(f => f !== facingValue)
          : [...c.facing, facingValue];
        return { ...c, facing: newFacing };
      }
      return c;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      document.getElementById("btn-setup-next").click();
    }, 500);
  };

  return (
    <ProjectSetupLayout
      currentStep={4}
      formId="units-form"
      isSubmitting={isSubmitting}
      title="Setup Project"
      subtitle="Step 4: Unit Configurations"
    >
      <div className="animate-fade-in w-full max-w-6xl">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">
              Units Setup
            </h2>
            <p className="text-sm text-text-muted">
              Define the unit configurations, sizes, and facing directions for the project.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <FiLayers className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Configurations</p>
              <p className="text-lg font-bold text-primary leading-none">{configs.length}</p>
            </div>
          </div>
        </div>

        <form id="units-form" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ── Repeatable Configuration Cards ── */}
            {configs.map((config, index) => {
              const computedTotal = config.sizes.length * 12;

              return (
                <div key={config.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col group hover:border-primary/30 transition-colors">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-text-heading">
                      Configuration {index + 1}
                    </h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {configs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveConfig(config.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-md"
                          aria-label="Remove Configuration"
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
                  <div className="p-5 flex-1 flex flex-col gap-6">
                    
                    {/* Unit Type (BHK) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Unit Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BHK_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => updateConfig(config.id, "bhk", opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                                        ${config.bhk === opt
                                          ? "bg-primary text-white shadow-sm ring-1 ring-primary"
                                          : "bg-slate-50 text-text-muted border border-border hover:border-slate-300 hover:text-text-heading"
                                        }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Facing (Multi-select) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Facing
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FACING_OPTIONS.map((opt) => {
                          const isSelected = config.facing.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleFacing(config.id, opt)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                                          ${isSelected
                                            ? "bg-primary/10 text-primary border border-primary/30"
                                            : "bg-slate-50 text-text-muted border border-border hover:border-slate-300 hover:text-text-heading"
                                          }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Unit Numbering */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Unit Numbering
                      </label>
                      <input
                        type="text"
                        value={config.numbering}
                        onChange={(e) => updateConfig(config.id, "numbering", e.target.value)}
                        placeholder="e.g. Series 01"
                        className="w-full px-4 py-2 bg-white border border-border rounded-xl text-sm text-text-heading
                                   placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                   focus:border-primary transition-all shadow-sm"
                      />
                    </div>

                    {/* Unit Sizes */}
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-border">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Unit Sizes
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddSize(config.id)}
                          className="text-xs font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
                        >
                          <FiPlus className="w-3 h-3"/> Add size
                        </button>
                      </div>
                      
                      <div className="space-y-2.5">
                        {config.sizes.map((size) => (
                          <div key={size.id} className="flex items-center gap-2">
                            <div className="flex-1">
                              <input
                                type="number"
                                required
                                value={size.area}
                                onChange={(e) => updateSize(config.id, size.id, "area", e.target.value)}
                                placeholder="Area (e.g. 1250)"
                                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-heading
                                           placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                           focus:border-primary transition-all shadow-sm"
                              />
                            </div>
                            <div className="w-24 shrink-0 relative">
                              <select
                                value={size.unit}
                                onChange={(e) => updateSize(config.id, size.id, "unit", e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-text-heading
                                           appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20
                                           focus:border-primary transition-all cursor-pointer shadow-sm"
                              >
                                <option value="Sq. Ft.">Sq. Ft.</option>
                                <option value="Sq. M.">Sq. M.</option>
                              </select>
                              <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
                            </div>
                            {config.sizes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSize(config.id, size.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Computed Total Line */}
                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between text-sm bg-slate-100 px-4 py-3 rounded-xl border border-slate-200">
                        <span className="font-semibold text-text-muted">Total Units</span>
                        <span className="font-bold text-text-heading">{computedTotal} Units</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* ── Add More Button Card ── */}
            <button
              type="button"
              onClick={handleAddConfig}
              className="flex flex-col items-center justify-center gap-3 min-h-[400px]
                         rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50
                         text-slate-400 hover:text-primary
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                <FiPlus className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-text-heading">Add Another Configuration</span>
              <span className="text-xs text-text-muted text-center max-w-[200px]">Create an additional unit layout and sizing</span>
            </button>
          </div>

        </form>
      </div>
    </ProjectSetupLayout>
  );
}
