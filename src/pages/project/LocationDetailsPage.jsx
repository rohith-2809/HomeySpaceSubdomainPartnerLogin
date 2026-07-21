import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiMapPin, FiChevronDown, FiArrowRight, FiCheck } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";

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
  const navigate = useNavigate();
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
    navigate("/projects/new/towers");
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Setup Project"
      topBarSubtitle="Step 2 of 4"
    >
      <div className="max-w-[640px] mx-auto animate-fade-in">
        
        {/* ── Heading ── */}
        <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-8">
          Location Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Map Preview ── */}
          <div className="relative group w-full h-48 md:h-56 bg-slate-100 rounded-xl border border-border overflow-hidden cursor-pointer">
            {/* Fake map pattern background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNDBoNDBNNDAgMEgwdjQweiIvPjwvZz48L3N2Zz4=')" }} />
            
            {/* Centered overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]
                            group-hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-3
                              group-hover:-translate-y-1 transition-transform duration-300">
                <FiMapPin className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-text-heading bg-white/80 px-4 py-1.5 rounded-full shadow-sm">
                Tap to set exact location
              </span>
            </div>
          </div>

          {/* ── Section Label ── */}
          <div>
            <h3 className="text-[13px] font-semibold text-text-placeholder uppercase tracking-wider border-b border-border pb-2 mb-5">
              Address Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
              
              {/* Street Address */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">
                  Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter full street address or survey number..."
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Locality */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Locality *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra West"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* Landmark */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Metro Station"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 400050"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-heading">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                             placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                             focus:border-primary transition-all"
                />
              </div>

              {/* State */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-medium text-text-heading">
                  State *
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl text-sm transition-all duration-200
                      ${isStateDropdownOpen ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-border hover:border-slate-300'}
                      ${selectedState ? 'text-text-heading' : 'text-text-placeholder'}`}
                  >
                    <span>
                      {selectedState ? statesList.find(s => s.value === selectedState)?.label : "Select state / UT"}
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
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
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                            ${selectedState === state.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-heading hover:bg-slate-50'}`}
                        >
                          {state.label}
                          {selectedState === state.value && <FiCheck className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Hidden input to ensure native form validation works if needed */}
                <input type="hidden" required value={selectedState} />
              </div>

            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-6 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects/new")}
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
