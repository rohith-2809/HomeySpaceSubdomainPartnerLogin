import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import StatusLayout from "../../components/StatusLayout";
import { useProjects } from "../../context/ProjectContext";

export default function AssignCompletePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { getProject } = useProjects();
  
  const project = getProject(id);
  const { buyerName, flat, tower } = location.state || { buyerName: "Rahul Sharma", flat: "105", tower: "Tower A" };

  return (
    <StatusLayout>
      <div className="flex flex-col items-center text-center">

        {/* ── Icon: solid teal checkmark circle ── */}
        <div className="relative mb-7 animate-scale-in">
          <div className="w-[72px] h-[72px] rounded-full bg-primary
                          flex items-center justify-center shadow-lg shadow-primary/20">
            <FiCheck className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* ── Heading ── */}
        <h2 className="text-[19px] font-bold text-text-heading leading-snug mb-3 animate-fade-up delay-100">
          Unit Assigned Successfully
        </h2>

        {/* ── Supporting text ── */}
        <p className="text-sm text-text-muted leading-relaxed mb-8 animate-fade-up delay-200">
          The unit has been successfully assigned to the buyer for <strong>{project?.name || "the project"}</strong>.
        </p>

        {/* ── Mini Summary Card ── */}
        <div className="w-full text-left bg-slate-50 rounded-xl border border-border p-5 mb-6 animate-fade-up delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
            
            {/* Buyer Col */}
            <div>
              <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 border-b border-border pb-1">Buyer</h3>
              <p className="text-sm font-bold text-text-heading">{buyerName}</p>
              <p className="text-xs text-text-body mt-1">Credentials sent via SMS</p>
            </div>

            {/* Unit Col */}
            <div>
              <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 border-b border-border pb-1">Unit</h3>
              <p className="text-sm font-bold text-text-heading">Flat {flat}</p>
              <p className="text-xs text-text-body mt-1">{tower}</p>
            </div>

          </div>
        </div>

        <p className="text-xs text-text-placeholder leading-relaxed mb-8 px-2 animate-fade-up delay-400">
          Login credentials have been sent to the buyer's registered mobile number and email ID.
        </p>

        {/* ── Single CTA ── */}
        <button
          type="button"
          onClick={() => navigate(`/projects/${id}`)}
          className="w-full flex items-center justify-center py-3.5 px-6
                     rounded-xl bg-primary text-white text-sm font-semibold
                     hover:bg-primary-hover hover:-translate-y-px
                     active:translate-y-0 active:scale-[0.99]
                     shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                     transition-all duration-300 cursor-pointer animate-fade-up delay-500"
        >
          Go to Dashboard
        </button>

      </div>
    </StatusLayout>
  );
}
