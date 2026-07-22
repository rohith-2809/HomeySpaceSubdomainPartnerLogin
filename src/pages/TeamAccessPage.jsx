import { useState } from "react";
import { FiUsers, FiPlus, FiSearch, FiMoreVertical, FiShield, FiMail, FiCheckCircle } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

const INITIAL_MEMBERS = [
  { id: 1, name: "Rohit Sharma", email: "rohit.s@example.com", role: "Admin", status: "Active", initials: "RS", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Priya Patel", email: "priya.p@example.com", role: "Sales Manager", status: "Active", initials: "PP", color: "bg-emerald-100 text-emerald-700" },
  { id: 3, name: "Amit Kumar", email: "amit.k@example.com", role: "Sales Executive", status: "Invited", initials: "AK", color: "bg-amber-100 text-amber-700" },
  { id: 4, name: "Neha Gupta", email: "neha.g@example.com", role: "Sales Executive", status: "Active", initials: "NG", color: "bg-violet-100 text-violet-700" },
];

export default function TeamAccessPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      activeNav="Team"
      locked={false}
      topBarTitle="Team Access"
      topBarSubtitle="Manage your organization's members and roles"
    >
      <div className="max-w-7xl mx-auto animate-fade-in pb-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
              Team Members
            </h1>
            <p className="text-sm text-text-muted">
              Add members to your organization and manage their permissions.
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 cursor-pointer">
            <FiPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <FiUsers className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-0.5">Total Members</p>
              <p className="text-2xl font-black text-text-heading">{members.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <FiShield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-0.5">Active Roles</p>
              <p className="text-2xl font-black text-text-heading">3</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <FiMail className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-0.5">Pending Invites</p>
              <p className="text-2xl font-black text-text-heading">1</p>
            </div>
          </div>
        </div>

        {/* ── Main Content Area ── */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          
          {/* Controls Bar */}
          <div className="px-6 py-4 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-text-heading bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm">All Members</span>
               <span className="text-sm font-semibold text-text-muted hover:text-text-heading cursor-pointer px-3 py-1">Admins</span>
               <span className="text-sm font-semibold text-text-muted hover:text-text-heading cursor-pointer px-3 py-1">Sales</span>
            </div>
            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm text-text-heading
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-border text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  <th className="px-6 py-4 w-1/3">Member</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${member.color}`}>
                          {member.initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-heading">{member.name}</p>
                          <p className="text-xs text-text-muted mt-0.5">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                        {member.role === 'Admin' && <FiShield className="w-3 h-3" />}
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {member.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          <FiCheckCircle className="w-3.5 h-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50">
                          <FiMail className="w-3 h-3" />
                          Invited
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-text-heading hover:bg-slate-100 rounded-lg transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <p className="text-sm text-text-muted">No members found matching your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
