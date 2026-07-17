import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMoreVertical, FiPlus, FiArrowRight, FiTrash2, FiChevronDown } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FACING_OPTIONS = ["North", "East", "South", "West"];

export default function UnitsSetupPage() {
  const navigate = useNavigate();

  const [configs, setConfigs] = useState([
    {
      id: 1,
      bhk: "3 BHK",
      sizes: [{ id: 1, area: "", unit: "Sq. Ft." }],
      facing: ["East"],
      numbering: ""
    }
  ]);

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
    navigate("/projects/new/review");
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Setup Project"
      topBarSubtitle="Step 4 of 4"
    >
      <div className="max-w-[640px] mx-auto animate-fade-in">
        
        {/* ── Heading ── */}
        <div className="mb-8 space-y-1.5">
          <h2 className="text-2xl font-bold text-text-heading tracking-tight">
            Units Setup
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Define the unit configurations, sizes, and facing directions for the selected tower.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Repeatable Configuration Cards ── */}
          <div className="space-y-5">
            {configs.map((config, index) => {
              // Fake auto-calculated total units based on number of sizes added to simulate behavior
              const computedTotal = config.sizes.length * 12;

              return (
                <div key={config.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-semibold text-text-heading">
                      Configuration {index + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {configs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveConfig(config.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-md"
                          aria-label="Remove Configuration"
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
                  <div className="p-5 space-y-6">
                    
                    {/* Unit Type (BHK) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-heading">
                        Unit Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BHK_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => updateConfig(config.id, "bhk", opt)}
                            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200
                                        ${config.bhk === opt
                                          ? "bg-primary text-white shadow-sm"
                                          : "bg-white text-text-body border border-border hover:border-slate-300 hover:text-text-heading"
                                        }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Unit Sizes */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-text-heading">
                          Unit Sizes
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddSize(config.id)}
                          className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                        >
                          + Add more sizes
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {config.sizes.map((size, sizeIndex) => (
                          <div key={size.id} className="flex items-center gap-3">
                            <div className="flex-1 relative">
                              <input
                                type="number"
                                required
                                value={size.area}
                                onChange={(e) => updateSize(config.id, size.id, "area", e.target.value)}
                                placeholder="Carpet Area (e.g. 1250)"
                                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                           placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                           focus:border-primary transition-all"
                              />
                            </div>
                            <div className="w-28 shrink-0 relative">
                              <select
                                value={size.unit}
                                onChange={(e) => updateSize(config.id, size.id, "unit", e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                           appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20
                                           focus:border-primary transition-all cursor-pointer"
                              >
                                <option value="Sq. Ft.">Sq. Ft.</option>
                                <option value="Sq. M.">Sq. M.</option>
                              </select>
                              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            </div>
                            {config.sizes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSize(config.id, size.id)}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Facing (Multi-select) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-heading">
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
                              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200
                                          ${isSelected
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-white text-text-body border border-border hover:border-slate-300 hover:text-text-heading"
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
                      <label className="block text-sm font-medium text-text-heading">
                        Unit Numbering
                      </label>
                      <input
                        type="text"
                        value={config.numbering}
                        onChange={(e) => updateConfig(config.id, "numbering", e.target.value)}
                        placeholder="e.g. Series 01"
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                                   placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                                   focus:border-primary transition-all"
                      />
                    </div>

                    {/* Computed Total Line */}
                    <div className="pt-2">
                      <p className="text-sm font-medium text-text-muted bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
                        Total Units (Configuration {index + 1}): <span className="font-semibold text-text-heading">{computedTotal} Units</span>
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
              onClick={handleAddConfig}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4
                         rounded-xl border-2 border-dashed border-slate-300 bg-white
                         text-sm font-semibold text-text-muted hover:text-text-heading
                         hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Another Configuration</span>
            </button>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-6 mt-4 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects/new/towers")}
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
