import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiFolder } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { api, mediaUrl } from "../../api/client";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export default function ProjectsListPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    api
      .get("/partner/builder-projects/")
      .then((data) => { if (alive) setProjects(data?.results || []); })
      .catch((e) => { if (alive) setError(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

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

        {loading ? (
          /* ── Loading Skeleton ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="h-32 bg-slate-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* ── Error State ── */
          <div className="bg-white rounded-2xl border border-dashed border-border py-20 px-6
                          flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100
                            flex items-center justify-center mb-4">
              <FiFolder className="w-8 h-8 text-red-300" />
            </div>
            <h3 className="text-base font-semibold text-text-heading mb-1.5">
              Couldn't load projects
            </h3>
            <p className="text-sm text-text-muted max-w-sm mb-6">
              {error.message || "Something went wrong. Please try again."}
            </p>
          </div>
        ) : projects.length === 0 ? (
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
            {projects.map((proj) => {
              const cover = mediaUrl(proj.cover_image);
              return (
                <div key={proj.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-slate-200">
                    {cover ? (
                      <img src={cover} alt={proj.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiFolder className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-text-heading tracking-wider uppercase shadow-sm">
                      {cap(proj.status)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-text-heading mb-1 truncate">{proj.name}</h3>
                    <p className="text-sm text-text-muted mb-4">{proj.location}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm">
                        <span className="font-semibold text-text-heading">{proj.total_units ?? "--"}</span> <span className="text-text-muted">Units</span>
                        {(proj.sold_units != null || proj.available_units != null) && (
                          <span className="text-text-muted"> · {proj.sold_units ?? 0} sold · {proj.available_units ?? 0} avail</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/projects/${proj.id}`)}
                        className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                      >
                        {proj.status === "draft" ? "Resume Setup →" : "Manage Project →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
