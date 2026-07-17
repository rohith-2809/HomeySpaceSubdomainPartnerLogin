import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiFolderPlus,
  FiUsers,
  FiSettings,
  FiLock,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

const NAV_ITEMS = [
  { icon: FiGrid,       label: "Dashboard",     path: "/dashboard" },
  { icon: FiFolderPlus, label: "Projects",      path: "/projects" },
  { icon: FiUsers,      label: "Team Access",   path: "/team" },
  { icon: FiSettings,   label: "Settings",      path: "/settings" },
];

/* ═══════════════════════════════════════════════════════════ */
/*       DASHBOARD LAYOUT  — Verification-Pending shell        */
/* ═══════════════════════════════════════════════════════════ */
export default function DashboardLayout({ 
  children, 
  partnerName = "Partner",
  activeNav = "Dashboard",
  locked = true,
  topBarTitle = null,
  topBarSubtitle = "Partner Dashboard",
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-page">

      {/* ─────────── Desktop Sidebar ─────────── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-border fixed top-0 left-0 h-screen z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border">
          <a
            href="https://homeyspace.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <img src="/HomeyspaceLogo.png" alt="HomeySpace" className="h-7 w-auto" />
            <span className="font-bold text-text-heading tracking-tight">HomeySpace</span>
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.label;
            const isItemLocked = locked && item.label !== "Dashboard";
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => !isItemLocked && item.path && navigate(item.path)}
                disabled={isItemLocked}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                            transition-all duration-200
                            ${isItemLocked
                              ? "opacity-35 cursor-not-allowed text-text-body"
                              : isActive
                              ? "bg-primary/8 text-primary"
                              : "text-text-body hover:bg-slate-50 hover:text-text-heading cursor-pointer"
                            }`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {isItemLocked && <FiLock className="w-3 h-3 opacity-60 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Profile & Logout */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-100 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                <img src="/vasavi_logo.png" alt="Profile" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-heading leading-tight truncate w-[100px]">{partnerName}</span>
                <span className="text-[11px] font-semibold text-text-muted mt-0.5">{locked ? "Pending" : "Verified"}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate("/")}
              className="p-2 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Log Out"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────── Main content (desktop: offset by sidebar) ─────────── */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-border px-5 lg:px-8 py-4
                           flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-text-placeholder uppercase tracking-wider">
              {topBarSubtitle}
            </p>
            <h1 className="text-base font-semibold text-text-heading leading-tight mt-0.5">
              {topBarTitle || `Hello, ${partnerName} 👋`}
            </h1>
          </div>
          <button
            type="button"
            className="relative p-2 rounded-lg text-text-muted hover:text-text-heading hover:bg-slate-50
                       transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border border-white" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 lg:px-8 py-7 pb-28 lg:pb-10">
          {children}
        </main>
      </div>

      {/* ─────────── Mobile Bottom Nav ─────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border
                      flex safe-area-inset-bottom">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.label;
          const isItemLocked = locked && item.label !== "Dashboard";
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => !isItemLocked && item.path && navigate(item.path)}
              disabled={isItemLocked}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1
                          text-[10px] font-semibold tracking-wide transition-colors
                          ${isItemLocked
                            ? "opacity-30 cursor-not-allowed text-text-muted"
                            : isActive
                            ? "text-primary"
                            : "text-text-muted cursor-pointer"
                          }`}
            >
              <div className="relative">
                <item.icon className="w-[20px] h-[20px]" />
                {isItemLocked && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-slate-300 rounded-full
                                   flex items-center justify-center">
                    <FiLock className="w-1.5 h-1.5 text-white" />
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
