import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUploadCloud, FiChevronDown, FiArrowRight } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import CustomDatePicker from "../../components/CustomDatePicker";

export default function AddProjectPage() {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState("Apartments");
  const [launchDate, setLaunchDate] = useState("");
  const [possessionDate, setPossessionDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/projects/new/location");
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Setup Project"
      topBarSubtitle="Step 1 of 4"
    >
      <div className="max-w-[640px] mx-auto animate-fade-in">
        
        {/* ── Heading ── */}
        <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-8">
          Add Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Cover Image Upload ── */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-text-heading">
              Project Cover
            </label>
            <div className="relative group flex flex-col items-center justify-center w-full h-44
                            rounded-xl border-2 border-dashed border-slate-300 bg-slate-50
                            hover:bg-slate-100 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/png, image/jpeg" />
              <div className="flex flex-col items-center text-center px-4">
                <FiUploadCloud className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors mb-2" />
                <p className="text-sm font-medium text-text-heading">
                  Upload Project Cover
                </p>
                <p className="text-xs text-text-muted mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* ── Section Label ── */}
          <div>
            <h3 className="text-[13px] font-semibold text-text-placeholder uppercase tracking-wider border-b border-border pb-2 mb-5">
              Project Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
              
              {/* Project Name */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Heights"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* RERA Number */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  RERA Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. P51900045872"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* Project Status */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Project Status
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="" disabled selected>Select status</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="pre_launch">Pre-Launch</option>
                    <option value="ready">Ready to Move</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Project Type
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl h-[46px]">
                  {["Apartments", "Villas"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`flex-1 rounded-lg text-sm font-semibold transition-all duration-200
                                  ${projectType === type
                                    ? "bg-white text-primary shadow-sm ring-1 ring-border"
                                    : "text-text-muted hover:text-text-heading"
                                  }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Launch Date */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Launch Date
                </label>
                <CustomDatePicker
                  value={launchDate}
                  onChange={setLaunchDate}
                  placeholder="Select launch date"
                />
              </div>

              {/* Expected Possession */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Expected Possession
                </label>
                <CustomDatePicker
                  value={possessionDate}
                  onChange={setPossessionDate}
                  placeholder="Select possession date"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter a brief description of the project amenities and highlights..."
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all resize-none"
                />
              </div>

            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-6 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6
                         rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                         hover:border-slate-300 hover:text-text-heading hover:-translate-x-px
                         active:translate-x-0 active:scale-[0.99]
                         transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="group w-full md:w-auto flex items-center justify-center gap-2 py-3.5 px-8
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cursor-pointer"
            >
              <span>Next Step</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
