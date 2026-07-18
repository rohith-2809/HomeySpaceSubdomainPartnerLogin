import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiAward,
  FiMapPin,
  FiCamera,
  FiChevronDown,
} from "react-icons/fi";
import OnboardingLayout from "../components/OnboardingLayout";
import { useOnboarding } from "../context/OnboardingContext";

/* ─── City options for dropdown ─── */
const CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Nagpur",
  "Coimbatore",
];

/* ═══════════════════════════════════════════════ */
/*         SCREEN 1 — COMPANY PROFILE             */
/* ═══════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const navigate = useNavigate();
  const { data, setProfile } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state — initialized from onboarding context so values persist on back-nav.
  const [experience, setExperience] = useState(data.profile.experience);
  const [projectsCompleted, setProjectsCompleted] = useState(data.profile.projectsCompleted);
  const [city, setCity] = useState(data.profile.city);
  const [logoPreview, setLogoPreview] = useState(data.profile.logoPreview);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
      setProfile({ logo: file, logoPreview: preview });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // No API call here — data is accumulated in onboarding context and submitted at review.
    navigate("/onboarding/basic-info");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      formId="company-profile-form"
      isSubmitting={isSubmitting}
      hideNext={isCityOpen}
    >
      <form id="company-profile-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="space-y-2 animate-fade-up">
          <h2 className="text-2xl xl:text-[28px] font-bold text-text-heading tracking-tight">
            Company Profile
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-md">
            Tell us about your company so we can personalize your dashboard experience.
          </p>
        </div>

        {/* Logo upload */}
        <div className="flex flex-col items-center gap-3 animate-fade-up delay-100">
          <label
            htmlFor="logo-upload"
            className="group relative w-28 h-28 rounded-full border-2 border-dashed border-slate-300
                       hover:border-primary/50 bg-surface-input flex items-center justify-center
                       cursor-pointer transition-all duration-300 overflow-hidden"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Company logo preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-text-placeholder group-hover:text-primary/60 transition-colors duration-300">
                <FiCamera className="w-6 h-6" />
                <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
              </div>
            )}

            {/* Camera badge */}
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center
                            shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <FiCamera className="w-3.5 h-3.5 text-white" />
            </div>

            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogoUpload}
            />
          </label>
          <p className="text-xs text-text-placeholder">Upload your company logo</p>
        </div>

        {/* Form fields — single column for this short form */}
        <div className="space-y-5">
          {/* Experience */}
          <div className="space-y-1.5 animate-fade-up delay-200">
            <label
              htmlFor="experience"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Experience <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="experience"
                name="experience"
                type="text"
                required
                placeholder="e.g. 12 years"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                  setProfile({ experience: e.target.value });
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* Projects Completed */}
          <div className="space-y-1.5 animate-fade-up delay-300">
            <label
              htmlFor="projects-completed"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              Projects Completed <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiAward className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
              <input
                id="projects-completed"
                name="projectsCompleted"
                type="number"
                required
                placeholder="e.g. 25"
                value={projectsCompleted}
                onChange={(e) => {
                  setProjectsCompleted(e.target.value);
                  setProfile({ projectsCompleted: e.target.value });
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                           text-sm text-text-heading placeholder:text-text-placeholder
                           hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                           transition-all duration-300"
              />
            </div>
          </div>

          {/* City of Operations — Custom dropdown */}
          <div className="space-y-1.5 animate-fade-up delay-400">
            <label
              htmlFor="city"
              className="block text-xs font-semibold text-text-body uppercase tracking-wider"
            >
              City of Operations <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <FiMapPin className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-text-placeholder transition-colors duration-300 pointer-events-none z-10" />
              <button
                id="city-dropdown-trigger"
                type="button"
                onClick={() => setIsCityOpen(!isCityOpen)}
                className={`w-full pl-11 pr-10 py-3 rounded-xl bg-surface-input border text-left
                           text-sm transition-all duration-300 cursor-pointer
                           ${city ? "text-text-heading" : "text-text-placeholder"}
                           ${isCityOpen
                             ? "border-border-focus ring-4 ring-primary/8"
                             : "border-border hover:border-slate-300"
                           }`}
              >
                {city || "Select your city"}
              </button>
              <FiChevronDown
                className={`absolute right-3.5 top-[14px] w-[18px] h-[18px] text-text-placeholder
                           pointer-events-none transition-transform duration-300 ${isCityOpen ? "rotate-180" : ""}`}
              />

              {/* Dropdown menu — rendered below, not clipped */}
              {isCityOpen && (
                <div
                  className="absolute left-0 right-0 mt-2 py-2 rounded-xl bg-white border border-border
                             shadow-2xl max-h-52 overflow-y-auto"
                  style={{ zIndex: 9999, top: "100%" }}
                >
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setProfile({ city: c });
                        setIsCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 cursor-pointer
                                 ${city === c
                                   ? "bg-primary/10 text-primary font-semibold"
                                   : "text-text-body hover:bg-slate-50"
                                 }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </form>
    </OnboardingLayout>
  );
}
