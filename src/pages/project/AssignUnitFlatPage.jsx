import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import DashboardLayout from "../../components/DashboardLayout";
import { api } from "../../api/client";
import { useAssignUnit } from "../../context/AssignUnitContext";

const ordinal = (n) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

export default function AssignUnitFlatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { setFlatSelection } = useAssignUnit();

  const tower = location.state?.tower;

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // If we arrived here without a tower, go back to the tower step.
  useEffect(() => {
    if (!tower) navigate(`/projects/${id}/assign/tower`, { replace: true });
  }, [tower, id, navigate]);

  useEffect(() => {
    if (!tower) return;
    let alive = true;
    setLoading(true);
    setError("");

    const load = async () => {
      let res = await api.get(`/partner/builder-projects/${id}/units/?tower_id=${tower.id}`);
      let results = res?.results || [];
      if (results.length === 0) {
        // Seed the units for this tower, then refetch.
        await api.post(`/partner/builder-projects/${id}/units/`, { tower_id: tower.id });
        res = await api.get(`/partner/builder-projects/${id}/units/?tower_id=${tower.id}`);
        results = res?.results || [];
      }
      return results;
    };

    load()
      .then((results) => { if (alive) setUnits(results); })
      .catch((err) => { if (alive) setError(err.message || "Failed to load units."); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [id, tower]);

  if (!tower) return null;

  // Group units by floor_number, sorted ascending.
  const floorsMap = new Map();
  for (const u of units) {
    if (!floorsMap.has(u.floor_number)) floorsMap.set(u.floor_number, []);
    floorsMap.get(u.floor_number).push(u);
  }
  const floors = [...floorsMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([floorNumber, list]) => ({
      floorNumber,
      units: list.sort((a, b) => String(a.unit_number).localeCompare(String(b.unit_number), undefined, { numeric: true })),
    }));

  const handleSelectFlat = (unit) => {
    setFlatSelection(id, tower, {
      id: unit.id,
      no: unit.unit_number,
      type: unit.unit_type,
      facing: unit.facing,
      size: unit.super_area,
      plan: "",
    });
    navigate(`/projects/${id}/assign/unit-details`);
  };

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Assign Unit"
      topBarSubtitle={tower.name}
    >
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
        
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-heading tracking-tight mb-1">
              Select Flat
            </h2>
            <p className="text-sm text-text-muted">
              Enter the buyer and booking details to assign this unit.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-[11px] font-bold tracking-wider uppercase cursor-pointer shadow-sm">All</span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:bg-primary/20 transition-colors">Available</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:bg-slate-200 transition-colors">Booked</span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="w-4 h-4 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search flat number..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                       placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                       focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* ── Floor Grid ── */}
        {loading ? (
          <div className="py-16 text-center text-sm text-text-muted">Loading units…</div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-red-600">{error}</div>
        ) : floors.length === 0 ? (
          <div className="py-16 text-center text-sm text-text-muted">No units available for this tower.</div>
        ) : (
          <div className="space-y-8">
            {floors.map((floor) => (
              <div key={floor.floorNumber}>
                <h3 className="text-sm font-bold text-text-heading mb-4 px-1 border-b border-border pb-2">
                  {ordinal(floor.floorNumber)} Floor <span className="text-text-muted font-normal">· {floor.units.length} units</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {floor.units.map(unit => {
                    const isAvailable = unit.status === "available";
                    return (
                      <button
                        key={unit.id}
                        disabled={!isAvailable}
                        onClick={() => handleSelectFlat(unit)}
                        className={`
                          flex flex-col p-3 rounded-xl border text-left transition-all relative overflow-hidden
                          ${isAvailable
                            ? "bg-white border-border hover:border-primary hover:shadow-md cursor-pointer group"
                            : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"}
                        `}
                      >
                        {isAvailable && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}

                        <span className="text-lg font-bold text-text-heading mb-1 relative z-10">{unit.unit_number}</span>
                        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider relative z-10">{unit.unit_type}</span>
                        <span className="text-[10px] text-text-placeholder relative z-10">{unit.facing} facing</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}/assign/tower`)}
            className="w-full sm:w-auto px-8 flex items-center justify-center py-3.5 mx-auto
                       rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                       hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       transition-all duration-300 cursor-pointer"
          >
            Back to Tower Selection
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
