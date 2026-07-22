import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiFolder,
  FiFileText,
  FiImage,
  FiMoreVertical,
  FiDownload,
  FiGrid,
  FiSearch
} from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";

/* ── Mock floor plans per tower ── */
const INITIAL_PLANS = {
  "tower-a": [
    { id: 1, name: "2 BHK Elite — Floor 1-12",    size: "1,250 sq.ft", file: "2BHK_Elite_v2.pdf",    type: "pdf" },
    { id: 2, name: "3 BHK Premium — Floor 1-12",  size: "1,450 sq.ft", file: "3BHK_Premium_v1.pdf",  type: "pdf" },
    { id: 3, name: "3 BHK Luxury — Floor 13-24",  size: "1,800 sq.ft", file: "3BHK_Luxury_v1.pdf",   type: "pdf" },
    { id: 4, name: "3 BHK Ultra — Penthouse",     size: "2,200 sq.ft", file: "3BHK_Ultra_v1.png",    type: "img" },
  ],
  "tower-b": [
    { id: 1, name: "2 BHK Elite — Floor 1-8",     size: "1,250 sq.ft", file: "2BHK_Elite_B.pdf",    type: "pdf" },
    { id: 2, name: "3 BHK Standard — Floor 1-8",  size: "1,400 sq.ft", file: "3BHK_Std_B.pdf",      type: "pdf" },
  ],
};

export default function FloorPlansPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id);

  const [plans] = useState(INITIAL_PLANS);
  const towers = project?.towers || [];
  
  const [selectedTowerId, setSelectedTowerId] = useState(towers.length > 0 ? towers[0].id : null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!project) return <div>Project not found</div>;

  const totalPlans = towers.reduce(
    (acc, t) => acc + (plans[t.id] || []).length,
    0
  );

  const selectedTower = towers.find(t => t.id === selectedTowerId);
  const currentPlans = (plans[selectedTowerId] || []).filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Floor Plans"
      topBarSubtitle={`${totalPlans} plan${totalPlans !== 1 ? "s" : ""} across ${towers.length} tower${towers.length !== 1 ? "s" : ""}`}
    >
      <div className="max-w-7xl mx-auto animate-fade-in pb-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
             <button
              onClick={() => navigate(`/projects/${id}`)}
              className="p-2.5 text-text-muted hover:text-text-heading bg-white border border-border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              aria-label="Back to Project"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
                Floor Plans
              </h1>
              <p className="text-sm text-text-muted">
                Manage layout blueprints organized per tower.
              </p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            Upload Plan
          </button>
        </div>

        {towers.length === 0 ? (
          /* Empty state — no towers configured */
          <div className="py-20 flex flex-col items-center gap-4 text-center bg-white rounded-2xl border border-border shadow-sm">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FiGrid className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-text-heading">
                No towers configured
              </p>
              <p className="text-sm text-text-muted max-w-xs mx-auto">
                Add towers to this project first before uploading floor plans.
              </p>
            </div>
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              Configure Towers
            </button>
          </div>
        ) : (
          /* ── Split View Layout ── */
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Sidebar: Towers List */}
            <div className="w-full lg:w-72 shrink-0 bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
              <div className="px-5 py-4 border-b border-border bg-slate-50/50">
                <h3 className="text-sm font-bold text-text-heading uppercase tracking-wider">Towers</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {towers.map(tower => {
                  const isSelected = tower.id === selectedTowerId;
                  const count = (plans[tower.id] || []).length;
                  return (
                    <button
                      key={tower.id}
                      onClick={() => setSelectedTowerId(tower.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group
                                  ${isSelected 
                                    ? "bg-primary/10 border-transparent text-primary" 
                                    : "bg-transparent border-transparent hover:bg-slate-50 text-text-body hover:text-text-heading"}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                                        ${isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500 group-hover:text-primary"}`}>
                          <FiFolder className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-text-heading"}`}>
                          {tower.name}
                        </span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isSelected ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content: Plans Grid */}
            <div className="flex-1 w-full bg-white border border-border rounded-2xl shadow-sm flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
              
              {/* Content Header */}
              <div className="px-6 py-4 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-text-heading">{selectedTower?.name}</h3>
                  <p className="text-xs font-semibold text-text-muted mt-0.5">{currentPlans.length} active plans</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search plans..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm text-text-heading
                               focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Plans Grid */}
              <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
                {currentPlans.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                        <FiFileText className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-base font-semibold text-text-heading mb-1">
                        No plans found
                      </p>
                      <p className="text-sm text-text-muted max-w-sm">
                        {searchQuery ? "Try adjusting your search criteria." : "Upload a floor plan blueprint for this tower."}
                      </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {currentPlans.map((plan, i) => (
                      <div 
                        key={plan.id}
                        className="bg-white border border-border hover:border-primary/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col animate-fade-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${plan.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-violet-50 text-violet-500'}`}>
                            {plan.type === 'pdf' ? <FiFileText className="w-6 h-6" /> : <FiImage className="w-6 h-6" />}
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-text-muted hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Download">
                              <FiDownload className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-text-muted hover:text-text-heading hover:bg-slate-100 rounded-md transition-colors" title="More">
                              <FiMoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <h4 className="text-sm font-bold text-text-heading leading-tight mb-1 line-clamp-1" title={plan.name}>{plan.name}</h4>
                          <div className="flex items-center justify-between text-xs text-text-muted">
                            <span className="truncate max-w-[120px]">{plan.file}</span>
                            <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded-md">{plan.size}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
