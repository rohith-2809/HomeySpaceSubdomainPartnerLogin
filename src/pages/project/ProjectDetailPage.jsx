import { useNavigate, useParams } from "react-router-dom";
import { 
  FiMapPin, 
  FiArrowLeft,
  FiUserPlus,
  FiUsers,
  FiBarChart2,
  FiPlus,
  FiGrid,
  FiFileText,
  FiSettings,
  FiChevronRight,
  FiTrendingUp,
  FiClock
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
      topBarSubtitle="Project Dashboard"
    >
      <div className="max-w-7xl mx-auto animate-fade-in pb-12 space-y-6">
        
        {/* ── Top Navigation Row ── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
              <FiSettings className="w-4 h-4 text-text-muted" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={() => navigate(`/projects/${id}/assign/tower`)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <FiUserPlus className="w-4 h-4" />
              Assign Unit
            </button>
          </div>
        </div>

        {/* ── Hero Section ── */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-border group animate-scale-in">
          <div className="absolute inset-0 bg-slate-900">
            <img src={project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"} alt="Cover" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end max-w-4xl z-10">
             <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-xs font-bold text-emerald-300 tracking-wider uppercase shadow-sm mb-5 w-max">
               {project.status || "Active"}
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">{project.name}</h1>
             <p className="flex items-center gap-2 text-lg text-slate-200 mb-6 font-medium">
               <FiMapPin className="w-5 h-5 text-primary-light" />
               {project.location}
             </p>
             <p className="text-base md:text-lg text-slate-300/90 leading-relaxed font-light line-clamp-3">
               {project.description || "An exclusive residential project designed for elevated lifestyle and premium comfort. Featuring state-of-the-art amenities and breathtaking views."}
             </p>
          </div>
        </div>

        {/* ── Main Layout Split ── */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ── Left Column (Project Context & Stats) ── */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            
            {/* Project Details */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
               <h3 className="text-sm font-bold text-text-heading mb-4">Project Overview</h3>
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-medium text-text-muted">Total Area</span>
                   <span className="text-sm font-bold text-text-heading">5 Acres</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-medium text-text-muted">Configurations</span>
                   <span className="text-sm font-bold text-text-heading">2 &amp; 3 BHK</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-medium text-text-muted">Total Towers</span>
                   <span className="text-sm font-bold text-text-heading">{project.towers?.length || 0} Towers</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-medium text-text-muted">RERA ID</span>
                   <span className="text-sm font-bold text-primary cursor-pointer hover:underline">P02400001234</span>
                 </div>
               </div>
            </div>

            {/* Recent Activity Mini-widget */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
                <FiClock className="w-4 h-4 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-slate-500">RK</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-heading"><span className="font-semibold">Rajesh Kumar</span> booked Flat 204</p>
                    <p className="text-xs text-text-muted">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FiTrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-heading">Price updated for <span className="font-semibold">Tower A</span></p>
                    <p className="text-xs text-text-muted">Yesterday</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer">
                View All Activity
              </button>
            </div>

          </div>

          {/* ── Right Column (Main Content & Modules) ── */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <FiUsers className="w-5 h-5 text-slate-500 group-hover:text-text-heading" />
                </div>
                <span className="text-sm font-semibold">Buyers list</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <FiBarChart2 className="w-5 h-5 text-slate-500 group-hover:text-text-heading" />
                </div>
                <span className="text-sm font-semibold">Reports</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <FiPlus className="w-5 h-5 text-slate-500 group-hover:text-text-heading" />
                </div>
                <span className="text-sm font-semibold">Add Tower</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-border rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-text-body cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <FiSettings className="w-5 h-5 text-slate-500 group-hover:text-text-heading" />
                </div>
                <span className="text-sm font-semibold">Config</span>
              </button>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Towers & Inventory */}
              <div 
                className="bg-white p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => {}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FiGrid className="w-6 h-6 text-blue-500" />
                  </div>
                  <FiChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1">Towers & Inventory</h3>
                <p className="text-sm text-text-muted mb-4">Manage blocks, floors, and flat availability.</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-text-heading">
                    {project.towers?.length ?? 0} Towers
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-text-heading">
                    {project.totalUnits} Units
                  </span>
                </div>
              </div>

              {/* Floor Plans */}
              <div 
                className="bg-white p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate(`/projects/${id}/floor-plans`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <FiGrid className="w-6 h-6 text-indigo-500" />
                  </div>
                  <FiChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1">Floor Plans</h3>
                <p className="text-sm text-text-muted mb-4">Upload and manage structural layouts.</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-text-heading">
                    8 Plans
                  </span>
                </div>
              </div>

              {/* Documents & Gallery */}
              <div 
                className="bg-white p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group md:col-span-2"
                onClick={() => navigate(`/projects/${id}/documents`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                    <FiFileText className="w-6 h-6 text-rose-500" />
                  </div>
                  <FiChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-heading mb-1">Documents & Gallery</h3>
                    <p className="text-sm text-text-muted">Manage contracts, brochures, and media assets.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-text-heading">
                      12 Documents
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-text-heading">
                      4 Albums
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Graphical Data Representation ── */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-text-heading">Project Progress &amp; Inventory</h3>
                  <p className="text-sm text-text-muted mt-0.5">Real-time overview of unit sales and availability.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    Sold
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Available
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Circular Donut Chart */}
                <div className="relative w-36 h-36 shrink-0">
                  <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                    {/* Background Track */}
                    <path
                      className="text-slate-100"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Available Segment */}
                    <path
                      className="text-emerald-400 transition-all duration-1000 ease-out"
                      strokeDasharray="100, 100"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Sold Segment */}
                    <path
                      className="text-primary transition-all duration-1000 ease-out"
                      strokeDasharray={`${salesPercentage}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-text-heading leading-none">{salesPercentage}%</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1">Sold</span>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Total Inventory</p>
                     <p className="text-2xl font-bold text-text-heading">{project.totalUnits} <span className="text-sm font-medium text-text-muted">Units</span></p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                     <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1">Sold Units</p>
                     <p className="text-2xl font-bold text-primary">{project.soldUnits} <span className="text-sm font-medium text-primary/70">Units</span></p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200/60">
                     <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider mb-1">Available</p>
                     <p className="text-2xl font-bold text-emerald-600">{project.availableUnits} <span className="text-sm font-medium text-emerald-600/70">Units</span></p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/60">
                     <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider mb-1">Hold / Blocked</p>
                     <p className="text-2xl font-bold text-amber-600">0 <span className="text-sm font-medium text-amber-600/70">Units</span></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
}
