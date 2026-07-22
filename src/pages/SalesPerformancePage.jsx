import { useState } from "react";
import { FiTrendingUp, FiTarget, FiDollarSign, FiCalendar, FiArrowUpRight, FiUsers, FiPieChart } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

const PERFORMANCE_DATA = [
  { id: 1, period: "Q1 2024", unitsSold: 45, revenue: "₹14.5 Cr", target: "85%", growth: "+12%" },
  { id: 2, period: "Q4 2023", unitsSold: 52, revenue: "₹18.2 Cr", target: "105%", growth: "+18%" },
  { id: 3, period: "Q3 2023", unitsSold: 38, revenue: "₹12.1 Cr", target: "75%", growth: "-5%" },
  { id: 4, period: "Q2 2023", unitsSold: 41, revenue: "₹13.4 Cr", target: "90%", growth: "+8%" },
];

export default function SalesPerformancePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      activeNav="Sales"
      locked={false}
      topBarTitle="Sales Performance"
      topBarSubtitle="Track your metrics and team goals"
    >
      <div className="max-w-7xl mx-auto animate-fade-in pb-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
              Sales Analytics
            </h1>
            <p className="text-sm text-text-muted">
              Monitor your real-time sales progress and historical performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-text-muted" />
                This Year
             </button>
             <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 flex items-center gap-2">
                <FiPieChart className="w-4 h-4" />
                Export Report
             </button>
          </div>
        </div>

        {/* ── Top Metric Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <FiArrowUpRight className="w-3 h-3" />
                +24%
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Total Revenue YTD</p>
              <h3 className="text-2xl font-black text-text-heading">₹42.8 Cr</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <FiArrowUpRight className="w-3 h-3" />
                +14%
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Units Sold YTD</p>
              <h3 className="text-2xl font-black text-text-heading">128</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-amber-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                On Track
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Target Achievement</p>
              <h3 className="text-2xl font-black text-text-heading">85%</h3>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full w-[85%]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-violet-600" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Active Leads</p>
              <h3 className="text-2xl font-black text-text-heading">452</h3>
            </div>
          </div>

        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area (Placeholder) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="px-6 py-5 border-b border-border bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-heading uppercase tracking-wider">Revenue Over Time</h3>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                <button className="px-3 py-1.5 text-xs font-bold text-text-heading bg-slate-100 rounded-md">Monthly</button>
                <button className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text-heading">Quarterly</button>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-slate-50/30">
               {/* Replace with actual chart library like Recharts in production */}
               <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 bg-white">
                  <p className="font-medium flex items-center gap-2"><FiTrendingUp /> Interactive Chart Area</p>
               </div>
            </div>
          </div>

          {/* Leaderboard or History Table */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-border shadow-sm flex flex-col min-h-[400px]">
             <div className="px-6 py-5 border-b border-border bg-slate-50/50">
              <h3 className="text-sm font-bold text-text-heading uppercase tracking-wider">Quarterly History</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-border">
                {PERFORMANCE_DATA.map((row) => (
                  <div key={row.id} className="p-5 hover:bg-slate-50 transition-colors">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-text-heading">{row.period}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${row.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {row.growth}
                        </span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Revenue: <span className="font-semibold text-text-heading">{row.revenue}</span></span>
                        <span className="text-text-muted">Units: <span className="font-semibold text-text-heading">{row.unitsSold}</span></span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
