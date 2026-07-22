import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ProjectSetupLayout from "../../components/ProjectSetupLayout";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomSelect from "../../components/CustomSelect";

export default function AddProjectPage() {
  const [projectType, setProjectType] = useState("Apartments");
  const [projectStatus, setProjectStatus] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [possessionDate, setPossessionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Let layout handle navigation
      document.getElementById("btn-setup-next").click();
    }, 500);
  };

  return (
    <ProjectSetupLayout
      currentStep={1}
      formId="add-project-form"
      isSubmitting={isSubmitting}
      title="Add Project"
      subtitle="Step 1: Core Details"
    >
      <div className="animate-fade-in max-w-4xl">
        <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">Project Details</h2>
        <p className="text-sm text-text-muted mb-8">Enter the core information and configuration for this property.</p>

        <form id="add-project-form" onSubmit={handleSubmit} className="space-y-8">
          
          {/* ── Cover Image Upload (Spans full width) ── */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-heading">Project Cover Image *</label>
            <div className="relative group flex flex-col items-center justify-center w-full h-40
                            rounded-xl border border-dashed border-slate-300 bg-slate-50/50
                            hover:bg-slate-50 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
              <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/png, image/jpeg" />
              <div className="flex flex-col items-center text-center px-4">
                <FiUploadCloud className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors mb-2" />
                <p className="text-sm font-semibold text-text-heading">Click to upload or drag and drop</p>
                <p className="text-xs text-text-muted mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
              </div>
            </div>
          </div>

          {/* ── Details Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="space-y-1.5 md:col-span-2 lg:col-span-2">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Project Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Skyline Heights"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                           placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                           focus:border-primary transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">RERA Number</label>
              <input
                type="text"
                placeholder="e.g. P51900045872"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                           placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                           focus:border-primary transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Project Status *</label>
              <CustomSelect
                value={projectStatus}
                onChange={setProjectStatus}
                placeholder="Select status"
                options={[
                  { value: "under_construction", label: "Under Construction" },
                  { value: "pre_launch", label: "Pre-Launch" },
                  { value: "ready", label: "Ready to Move" }
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Project Type *</label>
              <div className="flex bg-slate-100 p-1 rounded-xl h-[42px]">
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
            
            {/* Empty column spacer for 3-col grid if needed */}
            <div className="hidden lg:block"></div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Launch Date</label>
              <CustomDatePicker
                value={launchDate}
                onChange={setLaunchDate}
                placeholder="Select date"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Expected Possession</label>
              <CustomDatePicker
                value={possessionDate}
                onChange={setPossessionDate}
                placeholder="Select date"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2 lg:col-span-3 pt-2">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Description</label>
              <textarea
                rows={4}
                placeholder="Enter a brief description of the project amenities and highlights..."
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                           placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                           focus:border-primary transition-all resize-none shadow-sm"
              />
            </div>

          </div>
        </form>
      </div>
    </ProjectSetupLayout>
  );
}
