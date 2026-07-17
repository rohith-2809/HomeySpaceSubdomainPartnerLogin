import { useNavigate } from "react-router-dom";
import { FiPlus, FiFolder } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Projects"
      topBarSubtitle="Manage your properties"
    >
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-heading tracking-tight">
              All Projects
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              Manage your residential and commercial properties.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/projects/new")}
            className="group flex items-center justify-center gap-2 py-2.5 px-5
                       rounded-xl bg-primary text-white text-sm font-semibold
                       hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25
                       transition-all duration-300 cursor-pointer shrink-0"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          /* ── Empty State ── */
          <div className="bg-white rounded-2xl border border-dashed border-border py-20 px-6
                          flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100
                            flex items-center justify-center mb-4">
              <FiFolder className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-base font-semibold text-text-heading mb-1.5">
              No projects yet
            </h3>
            <p className="text-sm text-text-muted max-w-sm mb-6">
              Get started by adding your first project. You can configure towers, unit layouts, and media.
            </p>
            <button
              type="button"
              onClick={() => navigate("/projects/new")}
              className="flex items-center gap-2 py-2.5 px-5
                         rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                         hover:border-slate-300 hover:text-text-heading
                         transition-colors cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        ) : (
          /* ── Projects Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-32 bg-slate-200">
                  <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-text-heading tracking-wider uppercase shadow-sm">
                    {proj.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text-heading mb-1 truncate">{proj.name}</h3>
                  <p className="text-sm text-text-muted mb-4">{proj.location}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm">
                      <span className="font-semibold text-text-heading">{proj.totalUnits || "--"}</span> <span className="text-text-muted">Units</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${proj.id}`)}
                      className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                    >
                      {proj.status === "Active" ? "Manage Project →" : "Resume Setup →"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
