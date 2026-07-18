import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiMapPin,
  FiArrowLeft,
  FiUserPlus,
  FiUsers,
  FiBarChart2,
  FiPlus,
  FiGrid,
  FiFileText
} from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { api, mediaUrl } from "../../api/client";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setError(null);
    api
      .get(`/partner/builder-projects/${id}/`)
      .then((data) => { if (alive) setProject(data); })
      .catch((e) => {
        if (!alive) return;
        if (e.status === 404) setNotFound(true);
        else setError(e);
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout activeNav="Projects" locked={false} topBarTitle="Project" topBarSubtitle="Project Hub">
        <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
          <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="h-40 bg-slate-200 animate-pulse" />
            <div className="p-5 sm:p-6 space-y-4">
              <div className="h-7 w-1/2 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-slate-100 rounded animate-pulse" />
              <div className="h-20 w-full bg-slate-50 rounded-xl border border-border animate-pulse" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (notFound || !project) {
    return (
      <DashboardLayout activeNav="Projects" locked={false} topBarTitle="Project" topBarSubtitle="Project Hub">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
          <div className="bg-white rounded-2xl border border-dashed border-border py-20 px-6 flex flex-col items-center text-center">
            <h3 className="text-base font-semibold text-text-heading mb-1.5">
              {error ? "Couldn't load project" : "Project not found"}
            </h3>
            <p className="text-sm text-text-muted max-w-sm">
              {error?.message || "This project may have been removed or you don't have access to it."}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const cover = mediaUrl(project.cover_image);
  const towers = project.towers || [];
  const configs = project.unit_configurations || [];
  const salesPercentage =
    project.progress != null
      ? project.progress
      : project.total_units > 0
      ? Math.round((project.sold_units / project.total_units) * 100)
      : 0;

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle={project.name}
      topBarSubtitle="Project Hub"
    >
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
        
        {/* ── Back button ── */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors mb-2"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        {/* ── Project Header ── */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="relative h-40 bg-slate-200">
            {cover ? (
              <img src={cover} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiGrid className="w-8 h-8 text-slate-300" />
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-text-heading tracking-wider uppercase shadow-sm">
              {cap(project.status)}
            </div>
          </div>
          
          <div className="p-5 sm:p-6">
            <h1 className="text-2xl font-bold text-text-heading mb-1.5">{project.name}</h1>
            <p className="flex items-center gap-1.5 text-sm text-text-muted mb-6">
              <FiMapPin className="w-4 h-4 shrink-0" />
              {project.location}
            </p>

            {/* Stats & Progress */}
            <div className="bg-slate-50 rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3 text-sm">
                <div>
                  <span className="font-bold text-text-heading">{project.total_units ?? 0}</span> <span className="text-text-muted">Total Units</span>
                </div>
                <div className="flex gap-4">
                  <div><span className="font-bold text-amber-500">{project.sold_units ?? 0}</span> <span className="text-text-muted">Sold</span></div>
                  <div><span className="font-bold text-primary">{project.available_units ?? 0}</span> <span className="text-text-muted">Available</span></div>
                </div>
              </div>
              
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out rounded-full" 
                  style={{ width: `${salesPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Actions Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate(`/projects/${id}/assign/tower`)}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
              <FiUserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-text-heading text-center">Assign Unit</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <FiUsers className="w-5 h-5 text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-center">Buyers</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <FiBarChart2 className="w-5 h-5 text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-center">Reports</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <FiPlus className="w-5 h-5 text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-center">Add Tower</span>
          </button>
        </div>

        {/* ── Content Sections ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiGrid className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-text-heading">Towers Overview</h3>
              </div>
              <p className="text-xs text-text-muted">
                {towers.length === 0
                  ? "No towers yet"
                  : `${towers.length} ${towers.length === 1 ? "Tower" : "Towers"} · ${towers.map((t) => t.name).filter(Boolean).join(", ") || "Configured blocks"}`}
              </p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary-hover cursor-pointer">Manage</button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiGrid className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-text-heading">Floor Plans</h3>
              </div>
              <p className="text-xs text-text-muted">
                {configs.length === 0
                  ? "No plans yet"
                  : `${configs.length} ${configs.length === 1 ? "Plan" : "Plans"} available`}
              </p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary-hover cursor-pointer">View</button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-border flex items-center justify-between md:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiFileText className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-text-heading">Documents & Gallery</h3>
              </div>
              <p className="text-xs text-text-muted">Contracts and media. Upload from Unit Details.</p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary-hover cursor-pointer">View</button>
          </div>
        </div>

        {/* ── Project Options ── */}
        <div className="pt-6 border-t border-border mt-8">
          <ul className="space-y-4">
            <li><button className="text-sm font-semibold text-text-body hover:text-text-heading transition-colors cursor-pointer">Edit Project Details</button></li>
            <li><button className="text-sm font-semibold text-text-body hover:text-text-heading transition-colors cursor-pointer">Share Project</button></li>
            <li><button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer">Delete Project</button></li>
          </ul>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
