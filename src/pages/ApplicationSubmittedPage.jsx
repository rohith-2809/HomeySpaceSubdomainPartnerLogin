import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import StatusLayout from "../components/StatusLayout";

/* ═══════════════════════════════════════════════ */
/*     SCREEN 5 — APPLICATION SUBMITTED            */
/* ═══════════════════════════════════════════════ */
export default function ApplicationSubmittedPage() {
  const navigate = useNavigate();

  return (
    <StatusLayout>
      <div className="flex flex-col items-center text-center space-y-6">

        {/* Icon — soft teal tint signals "submitted" (not yet fully approved) */}
        <div className="relative animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
              <FiCheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
        </div>

        {/* Heading + supporting text */}
        <div className="space-y-3 animate-fade-up delay-100">
          <h2 className="text-xl font-bold text-text-heading leading-snug">
            Your Builder Application is Submitted!
          </h2>
          <p className="text-sm text-text-body leading-relaxed">
            Our team will verify your documents within{" "}
            <span className="font-semibold text-text-heading">24–48 hours</span>.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Once approved, you can start adding projects and generating 3D homes
            for your flat owners.
          </p>
        </div>

        {/* Action buttons — stacked, primary on top */}
        <div className="w-full space-y-3 animate-fade-up delay-200 pt-2">
          <button
            type="button"
            onClick={() => navigate("/status/pending")}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6
                       rounded-xl bg-primary text-white text-sm font-semibold
                       hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                       transition-all duration-300 cursor-pointer"
          >
            Go to Dashboard (Pending)
          </button>

          <a
            href="https://homeyspace.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3.5 px-6
                       rounded-xl border border-border bg-white text-sm font-semibold text-text-body
                       hover:border-slate-300 hover:text-text-heading hover:-translate-y-px
                       active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            Home
          </a>
        </div>

      </div>
    </StatusLayout>
  );
}
