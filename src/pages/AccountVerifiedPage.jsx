import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import StatusLayout from "../components/StatusLayout";

/* ═══════════════════════════════════════════════════════════ */
/*   SCREEN 7 — ACCOUNT VERIFIED                               */
/*   The explicit "your status changed" moment. Closes the     */
/*   loop started at "Application Submitted." Single clean     */
/*   handoff into the real, fully-unlocked product.            */
/* ═══════════════════════════════════════════════════════════ */
export default function AccountVerifiedPage() {
  const navigate = useNavigate();

  return (
    <StatusLayout>
      <div className="flex flex-col items-center text-center">

        {/* ── Icon: soft teal-tinted, outline/soft-fill ──
            Intentionally lighter than a fully solid circle.
            This is a transition moment, not a "task complete" terminal state. */}
        <div className="relative mb-7 animate-scale-in">
          <div className="w-[72px] h-[72px] rounded-full bg-primary-50
                          flex items-center justify-center">
            <div className="w-[52px] h-[52px] rounded-full bg-primary-100
                            flex items-center justify-center">
              <FiCheck className="w-7 h-7 text-primary" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ── Heading ── */}
        <h2 className="text-[19px] font-bold text-text-heading leading-snug mb-3 animate-fade-up delay-100">
          Your account is verified.
        </h2>

        {/* ── Supporting text ── */}
        <p className="text-sm text-text-muted leading-relaxed mb-8 animate-fade-up delay-200">
          You now have full access to Homeyspace Partner Dashboard.
        </p>

        {/* ── Single CTA — clean handoff, no secondary action ── */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center py-3.5 px-6
                     rounded-xl bg-primary text-white text-sm font-semibold
                     hover:bg-primary-hover hover:-translate-y-px
                     active:translate-y-0 active:scale-[0.99]
                     shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                     transition-all duration-300 cursor-pointer animate-fade-up delay-300"
        >
          Go to Dashboard
        </button>

      </div>
    </StatusLayout>
  );
}
