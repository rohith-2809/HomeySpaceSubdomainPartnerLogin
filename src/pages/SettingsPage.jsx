import { useState } from "react";
import { FiUser, FiBell, FiLock, FiGlobe, FiCreditCard, FiSave } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout
      activeNav="Settings"
      locked={false}
      topBarTitle="Settings"
      topBarSubtitle="Manage your account preferences and configurations"
    >
      <div className="max-w-6xl mx-auto animate-fade-in pb-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
              Account Settings
            </h1>
            <p className="text-sm text-text-muted">
              Update your organization details, security, and billing.
            </p>
          </div>
        </div>

        {/* ── Settings Layout ── */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0 bg-white border border-border rounded-2xl shadow-sm p-3">
             <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'profile' ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-slate-50 hover:text-text-heading"
                  }`}
                >
                  <FiUser className="w-4 h-4" />
                  Organization Profile
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'security' ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-slate-50 hover:text-text-heading"
                  }`}
                >
                  <FiLock className="w-4 h-4" />
                  Security & Password
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'notifications' ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-slate-50 hover:text-text-heading"
                  }`}
                >
                  <FiBell className="w-4 h-4" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'billing' ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-slate-50 hover:text-text-heading"
                  }`}
                >
                  <FiCreditCard className="w-4 h-4" />
                  Billing & Plans
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'preferences' ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-slate-50 hover:text-text-heading"
                  }`}
                >
                  <FiGlobe className="w-4 h-4" />
                  Global Preferences
                </button>
             </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full">
            {activeTab === 'profile' && (
              <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in">
                <div className="px-6 py-5 border-b border-border bg-slate-50/50">
                  <h3 className="text-base font-bold text-text-heading">Organization Profile</h3>
                  <p className="text-sm text-text-muted mt-1">Manage your public-facing company information.</p>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Logo Upload */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                       <span className="text-primary font-bold text-xl">HS</span>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm mb-2">
                        Upload New Logo
                      </button>
                      <p className="text-xs text-text-muted">Recommended size 512x512px (JPG, PNG)</p>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5 md:col-span-2 max-w-xl">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Company Name</label>
                      <input type="text" defaultValue="HomeySpace Developments" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>
                    
                    <div className="space-y-1.5 max-w-sm">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Contact Email</label>
                      <input type="email" defaultValue="contact@homeyspace.com" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>

                    <div className="space-y-1.5 max-w-sm">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Phone Number</label>
                      <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>

                    <div className="space-y-1.5 md:col-span-2 max-w-xl">
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Registered Address</label>
                      <textarea rows={3} defaultValue="123 Business Park, Tech Center, Bengaluru, Karnataka" className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm resize-none"></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                     <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20">
                       <FiSave className="w-4 h-4" />
                       Save Changes
                     </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'profile' && (
              <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in p-12 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {activeTab === 'security' && <FiLock className="w-8 h-8 text-slate-300" />}
                    {activeTab === 'notifications' && <FiBell className="w-8 h-8 text-slate-300" />}
                    {activeTab === 'billing' && <FiCreditCard className="w-8 h-8 text-slate-300" />}
                    {activeTab === 'preferences' && <FiGlobe className="w-8 h-8 text-slate-300" />}
                 </div>
                 <h3 className="text-lg font-bold text-text-heading mb-2 capitalize">{activeTab} Settings</h3>
                 <p className="text-sm text-text-muted max-w-sm">This section is currently under development. Check back soon for updates.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
