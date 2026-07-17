import { useNavigate } from "react-router-dom";
import { 
  FiFolderPlus, 
  FiUsers, 
  FiTrendingUp, 
  FiFileText,
  FiCheck
} from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

export default function DashboardHomePage() {
  const navigate = useNavigate();

  // Mock partner data
  const partnerName = "Vasavi Group";

  return (
    <DashboardLayout
      activeNav="Dashboard"
      locked={false}
      topBarTitle="Overview"
      topBarSubtitle="Partner Dashboard"
      partnerName={partnerName}
    >
      <div className="max-w-5xl mx-auto space-y-8 pb-8">
        
        {/* ── Hero / Profile Card ── */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm animate-fade-up">
          {/* Background Image & Gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          
          {/* Glass Card Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/20 bg-white overflow-hidden shrink-0 shadow-lg p-1.5 flex items-center justify-center">
              <img 
                src="/vasavi_logo.png" 
                alt="Partner Avatar" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="pb-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex items-center gap-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  <FiCheck className="w-3 h-3" />
                  Verified Partner
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                {partnerName}
              </h2>
            </div>
          </div>
        </div>

        {/* ── Action Cards Grid (2x2) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-100">
          
          {/* Projects Card */}
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border shadow-sm
                       hover:border-slate-300 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[14px] bg-primary-50 flex items-center justify-center shrink-0
                            group-hover:bg-primary/10 transition-colors">
              <FiFolderPlus className="w-6 h-6 text-primary" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-text-heading mb-0.5">Projects</h3>
              <p className="text-sm text-text-muted">12 Active Projects</p>
            </div>
          </button>

          {/* Team Access Card */}
          <button
            type="button"
            onClick={() => navigate("/team")}
            className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border shadow-sm
                       hover:border-slate-300 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[14px] bg-primary-50 flex items-center justify-center shrink-0
                            group-hover:bg-primary/10 transition-colors">
              <FiUsers className="w-6 h-6 text-primary" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-text-heading mb-0.5">Team Access</h3>
              <p className="text-sm text-text-muted">Manage roles &amp; invites</p>
            </div>
          </button>

          {/* Sales Performance Card */}
          <button
            type="button"
            onClick={() => navigate("/sales")}
            className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border shadow-sm
                       hover:border-slate-300 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[14px] bg-amber-50 flex items-center justify-center shrink-0
                            group-hover:bg-amber-100 transition-colors">
              <FiTrendingUp className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-text-heading mb-0.5">Sales Performance</h3>
              <p className="text-sm text-text-muted">Track bookings &amp; leads</p>
            </div>
          </button>

          {/* Documents Card */}
          <button
            type="button"
            onClick={() => navigate("/documents")}
            className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border shadow-sm
                       hover:border-slate-300 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[14px] bg-primary-50 flex items-center justify-center shrink-0
                            group-hover:bg-primary/10 transition-colors">
              <FiFileText className="w-6 h-6 text-primary" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-text-heading mb-0.5">Documents</h3>
              <p className="text-sm text-text-muted">Contracts &amp; permits</p>
            </div>
          </button>

        </div>

        {/* ── Today's Snapshot ── */}
        <div className="pt-2 animate-fade-up delay-200">
          
          {/* Section Header */}
          <div className="flex items-baseline gap-3 mb-5">
            <h3 className="text-lg font-semibold text-text-heading tracking-tight">
              Today's Snapshot
            </h3>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              Live overview
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                New Leads
              </p>
              <p className="text-2xl font-bold text-text-heading">24</p>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                New Bookings
              </p>
              <p className="text-2xl font-bold text-text-heading">3</p>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Approvals Pending
              </p>
              <p className="text-2xl font-bold text-text-heading">8</p>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Amount Collected
              </p>
              <p className="text-2xl font-bold text-text-heading">₹1.2 <span className="text-lg text-text-muted font-semibold">Cr</span></p>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
