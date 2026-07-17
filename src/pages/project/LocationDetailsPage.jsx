import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiChevronDown, FiArrowRight } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";

export default function LocationDetailsPage() {
  const navigate = useNavigate();

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
                <div className="relative">
                  <select
                    required
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                               appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="" disabled selected>Select state / UT</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="AR">Arunachal Pradesh</option>
                    <option value="AS">Assam</option>
                    <option value="BR">Bihar</option>
                    <option value="CG">Chhattisgarh</option>
                    <option value="GA">Goa</option>
                    <option value="GJ">Gujarat</option>
                    <option value="HR">Haryana</option>
                    <option value="HP">Himachal Pradesh</option>
                    <option value="JH">Jharkhand</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="MN">Manipur</option>
                    <option value="ML">Meghalaya</option>
                    <option value="MZ">Mizoram</option>
                    <option value="NL">Nagaland</option>
                    <option value="OR">Odisha</option>
                    <option value="PB">Punjab</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="SK">Sikkim</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="TS">Telangana</option>
                    <option value="TR">Tripura</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="UK">Uttarakhand</option>
                    <option value="WB">West Bengal</option>
                    <option value="AN">Andaman and Nicobar Islands</option>
                    <option value="CH">Chandigarh</option>
                    <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="DL">Delhi</option>
                    <option value="JK">Jammu and Kashmir</option>
                    <option value="LA">Ladakh</option>
                    <option value="LD">Lakshadweep</option>
                    <option value="PY">Puducherry</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
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
