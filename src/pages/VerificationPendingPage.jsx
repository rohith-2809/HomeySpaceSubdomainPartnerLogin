import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiCheck, FiLock } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

/* ─── Application status steps ─── */
const STATUS_STEPS = [
  {
    id: "submitted",
    label: "Application Submitted",
    meta: "Oct 24, 10:30 AM",
    state: "done",      // teal check
  },
  {
    id: "review",
    label: "Under Review",
    meta: "Estimated time: 24–48 hours",
    state: "active",    // pulsing dot
  },
  {
    id: "access",
    label: "Approval & Access",
    meta: "Unlock full dashboard features",
    state: "pending",   // gray lock
  },
];

/* ═══════════════════════════════════════════════════════════ */
/*       SCREEN 6 — VERIFICATION PENDING DASHBOARD             */
/* ═══════════════════════════════════════════════════════════ */
export default function VerificationPendingPage() {
  const navigate = useNavigate();
  const { partner, refreshStatus } = useAuth();

  // On mount, refresh status immediately, then poll every 15s until verified.
  useEffect(() => {
    let interval;

    const check = async () => {
      const s = await refreshStatus();
      if (s?.application_status === "verified") {
        clearInterval(interval);
        navigate("/status/verified");
      }
    };

    check();
    interval = setInterval(check, 15000);

    return () => clearInterval(interval);
  }, [refreshStatus, navigate]);

  return (
    <DashboardLayout partnerName={partner?.business_name || "Skyline"}>
      <div className="max-w-2xl mx-auto lg:mx-0 space-y-5">

        {/* ── Verification Pending card ── */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5 sm:p-6
                        flex items-start gap-4 animate-fade-up">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200
                          flex items-center justify-center shrink-0">
            <FiClock className="w-6 h-6 text-amber-500" />
          </div>
          <div className="pt-0.5">
            <h2 className="text-base font-semibold text-text-heading mb-1">
              Verification Pending
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We are currently reviewing your documents. Full access will be granted shortly.
            </p>
          </div>
        </div>

        {/* ── Application Status card ── */}
        <div className="bg-white rounded-xl border border-border shadow-sm animate-fade-up delay-100">
          <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-text-heading">Application Status</h3>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-0">
            {STATUS_STEPS.map((step, index) => {
              const isLast = index === STATUS_STEPS.length - 1;
              return (
                <div key={step.id} className="flex gap-4">
                  {/* ── Indicator column (circle + connecting line) ── */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                  transition-all duration-300
                                  ${step.state === "done"
                                    ? "bg-primary"
                                    : step.state === "active"
                                    ? "bg-white border-2 border-primary"
                                    : "bg-slate-50 border-2 border-slate-200"
                                  }`}
                    >
                      {step.state === "done" && (
                        <FiCheck className="w-4 h-4 text-white" />
                      )}
                      {step.state === "active" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      )}
                      {step.state === "pending" && (
                        <FiLock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>

                    {/* Connecting line */}
                    {!isLast && (
                      <div
                        className={`w-0.5 h-10 my-1 rounded-full
                                    ${step.state === "done" ? "bg-primary/25" : "bg-slate-100"}`}
                      />
                    )}
                  </div>

                  {/* ── Label + meta ── */}
                  <div className={`pt-1 ${!isLast ? "pb-0" : "pb-1"}`}>
                    <p
                      className={`text-sm font-semibold leading-tight
                                  ${step.state === "done"
                                    ? "text-primary"
                                    : step.state === "active"
                                    ? "text-text-heading"
                                    : "text-text-muted"
                                  }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5
                                  ${step.state === "done"
                                    ? "text-primary/70"
                                    : step.state === "active"
                                    ? "text-text-muted"
                                    : "text-text-placeholder"
                                  }`}
                    >
                      {step.meta}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Contact Support ── */}
        <p className="text-center text-sm text-text-muted animate-fade-up delay-200">
          Having issues?{" "}
          <a
            href="mailto:support@homeyspace.in"
            className="font-medium text-primary hover:text-primary-hover hover:underline transition-colors"
          >
            Contact Support
          </a>{" "}
          if delayed.
        </p>

        {/* ── Dashboard button ── */}
        <button
          type="button"
          onClick={() => navigate("/status/pending")}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6
                     rounded-xl bg-primary text-white text-sm font-semibold
                     hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                     shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                     transition-all duration-300 cursor-pointer animate-fade-up delay-300"
        >
          Go to Dashboard (Pending)
        </button>

      </div>
    </DashboardLayout>
  );
}
