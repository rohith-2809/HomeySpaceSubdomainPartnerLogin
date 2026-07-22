import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiFolder, FiSearch, FiFilter, FiMoreVertical, FiMapPin, FiGrid, FiList } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Projects"
      topBarSubtitle="Manage your properties"
    >
      <div className="max-w-7xl mx-auto space-y-6 pb-12">

        {/* ── Web Centric Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-heading tracking-tight">
              All Projects
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              Manage and assign units across your active properties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium
                           text-text-heading placeholder:text-text-placeholder focus:outline-none
                           focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>

            <button className="flex items-center gap-2 px-3 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm">
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              onClick={() => navigate("/projects/new")}
              className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-md shadow-primary/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <FiPlus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* ── View Toggles ── */}
        {projects.length > 0 && (
          <div className="flex justify-end">
            <div className="flex items-center bg-white border border-border rounded-lg p-0.5 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === "table" ? "bg-slate-100 text-primary" : "text-text-muted hover:text-text-heading"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-slate-100 text-primary" : "text-text-muted hover:text-text-heading"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          /* ── Empty State ── */
          <div className="bg-white rounded-2xl border border-dashed border-border py-24 px-6
                          flex flex-col items-center text-center animate-fade-in shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100
                            flex items-center justify-center mb-4">
              <FiFolder className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-base font-semibold text-text-heading mb-1.5">
              No projects found
            </h3>
            <p className="text-sm text-text-muted max-w-sm mb-6">
              {searchQuery ? "Try adjusting your search filters." : "Get started by adding your first project configuration."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate("/projects/new")}
                className="flex items-center gap-2 py-2.5 px-5 rounded-xl border border-border bg-white text-sm font-semibold text-text-body hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in">
            {viewMode === "table" ? (
              /* ── Table View ── */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-border text-xs uppercase tracking-wider text-text-muted">
                      <th className="py-3 px-6 font-semibold">Project Name</th>
                      <th className="py-3 px-6 font-semibold">Location</th>
                      <th className="py-3 px-6 font-semibold">Status</th>
                      <th className="py-3 px-6 font-semibold">Progress</th>
                      <th className="py-3 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProjects.map((proj) => {
                      const salesProgress = proj.totalUnits > 0 ? Math.round((proj.soldUnits / proj.totalUnits) * 100) : 0;
                      return (
                        <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/projects/${proj.id}`)}>
                          <td className="py-4 px-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                              <img src={proj.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-text-heading truncate">{proj.name}</p>
                              <p className="text-xs text-text-muted">{proj.totalUnits || 0} Units</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-text-body whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <FiMapPin className="w-3.5 h-3.5 text-text-placeholder" />
                              {proj.location}
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                              {proj.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 w-48">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path className="text-primary" strokeDasharray={`${salesProgress}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-[9px] font-bold text-text-heading">{salesProgress}%</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-text-heading leading-none mb-1">{proj.soldUnits} Sold</p>
                                <p className="text-[10px] text-text-muted leading-none">{proj.availableUnits} Avail</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                              <FiMoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* ── Grid View ── */
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-surface-page">
                {filteredProjects.map((proj) => {
                   const salesProgress = proj.totalUnits > 0 ? Math.round((proj.soldUnits / proj.totalUnits) * 100) : 0;
                   return (
                    <div key={proj.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow hover:border-primary/30 cursor-pointer flex flex-col sm:flex-row h-auto sm:h-56 group" onClick={() => navigate(`/projects/${proj.id}`)}>
                      <div className="relative h-48 sm:h-full sm:w-2/5 bg-slate-200 shrink-0 overflow-hidden">
                        <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-text-heading tracking-wider uppercase shadow-sm">
                          {proj.status}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-text-heading mb-1 truncate">{proj.name}</h3>
                        <p className="flex items-center gap-1.5 text-xs font-medium text-text-muted mb-3">
                           <FiMapPin className="w-3.5 h-3.5 shrink-0 text-text-placeholder" />
                           <span className="truncate">{proj.location}</span>
                        </p>
                        
                        <p className="text-sm text-text-body line-clamp-3 mb-4 leading-relaxed pr-2">
                          {proj.description || "An exclusive residential project designed for elevated lifestyle and premium comfort."}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-text-heading mb-0.5">{proj.soldUnits} Units Sold</p>
                            <p className="text-[10px] font-medium text-text-muted">{proj.availableUnits} Available • {proj.totalUnits} Total</p>
                          </div>
                          <div className="relative w-11 h-11 shrink-0">
                            <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                              <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              <path className="text-primary transition-all duration-1000 ease-out" strokeDasharray={`${salesProgress}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-text-heading leading-none">{salesProgress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
