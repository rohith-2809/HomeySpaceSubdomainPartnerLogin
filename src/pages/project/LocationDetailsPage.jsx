import { useState, useRef, useEffect } from "react";
import { FiMapPin, FiChevronDown, FiCheck } from "react-icons/fi";
import ProjectSetupLayout from "../../components/ProjectSetupLayout";

const statesList = [
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BR", label: "Bihar" },
  { value: "CG", label: "Chhattisgarh" },
  { value: "GA", label: "Goa" },
  { value: "GJ", label: "Gujarat" },
  { value: "HR", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JH", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KL", label: "Kerala" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MH", label: "Maharashtra" },
  { value: "MN", label: "Manipur" },
  { value: "ML", label: "Meghalaya" },
  { value: "MZ", label: "Mizoram" },
  { value: "NL", label: "Nagaland" },
  { value: "OR", label: "Odisha" },
  { value: "PB", label: "Punjab" },
  { value: "RJ", label: "Rajasthan" },
  { value: "SK", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TS", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UK", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
  { value: "AN", label: "Andaman and Nicobar Islands" },
  { value: "CH", label: "Chandigarh" },
  { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "DL", label: "Delhi" },
  { value: "JK", label: "Jammu and Kashmir" },
  { value: "LA", label: "Ladakh" },
  { value: "LD", label: "Lakshadweep" },
  { value: "PY", label: "Puducherry" },
];

export default function LocationDetailsPage() {
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const dropdownRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      document.getElementById("btn-setup-next").click();
    }, 500);
  };

  return (
    <ProjectSetupLayout
      currentStep={2}
      formId="location-form"
      isSubmitting={isSubmitting}
      title="Setup Project"
      subtitle="Step 2: Location"
    >
      <div className="animate-fade-in w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-2">Location Details</h2>
        <p className="text-sm text-text-muted mb-8">Pinpoint the project location and provide the exact address.</p>

        <form id="location-form" onSubmit={handleSubmit}>
          
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* ── Left side: Map ── */}
            <div className="w-full xl:w-5/12 flex flex-col gap-2 shrink-0">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Map Location</label>
              <div className="relative group w-full h-[320px] bg-slate-100 rounded-2xl border border-border overflow-hidden cursor-pointer shadow-sm">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNDBoNDBNNDAgMEgwdjQweiIvPjwvZz48L3N2Zz4=')" }} />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]
                                group-hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-3
                                  group-hover:-translate-y-1 transition-transform duration-300">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-text-heading bg-white/90 px-5 py-2 rounded-xl shadow-sm border border-slate-100">
                    Set precise location
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2 text-center">Pin the exact coordinates for the property.</p>
            </div>

            {/* ── Right side: Address Form ── */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
                
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Street Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter full street address or survey number..."
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all resize-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Locality *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bandra West"
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Metro Station"
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 400050"
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-heading
                               placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">State *</label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-sm transition-all duration-200
                        ${isStateDropdownOpen ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-border hover:border-slate-300 shadow-sm'}
                        ${selectedState ? 'text-text-heading' : 'text-text-placeholder'}`}
                    >
                      <span>
                        {selectedState ? statesList.find(s => s.value === selectedState)?.label : "Select state / UT"}
                      </span>
                      <FiChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                      className={`absolute z-10 w-full mt-2 bg-white border border-border rounded-xl shadow-lg shadow-black/5 overflow-hidden transition-all duration-200 origin-top
                        ${isStateDropdownOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}
                    >
                      <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
                        {statesList.map((state) => (
                          <button
                            key={state.value}
                            type="button"
                            onClick={() => {
                              setSelectedState(state.value);
                              setIsStateDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between
                              ${selectedState === state.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-heading hover:bg-slate-50'}`}
                          >
                            {state.label}
                            {selectedState === state.value && <FiCheck className="w-4 h-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <input type="hidden" required value={selectedState} />
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </ProjectSetupLayout>
  );
}
