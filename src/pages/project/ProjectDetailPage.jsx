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
import { useProjects } from "../../context/ProjectContext";

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id);

  if (!project) return <div>Project not found</div>;

  const salesPercentage = project.totalUnits > 0 ? Math.round((project.soldUnits / project.totalUnits) * 100) : 0;

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
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-text-heading tracking-wider uppercase shadow-sm">
              Active
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
                  <span className="font-bold text-text-heading">{project.totalUnits}</span> <span className="text-text-muted">Total Units</span>
                </div>
                <div className="flex gap-4">
                  <div><span className="font-bold text-amber-500">{project.soldUnits}</span> <span className="text-text-muted">Sold</span></div>
                  <div><span className="font-bold text-primary">{project.availableUnits}</span> <span className="text-text-muted">Available</span></div>
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
              <p className="text-xs text-text-muted">1 Tower · Configured blocks</p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary-hover cursor-pointer">Manage</button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiGrid className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-text-heading">Floor Plans</h3>
              </div>
              <p className="text-xs text-text-muted">1 Plan available</p>
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
