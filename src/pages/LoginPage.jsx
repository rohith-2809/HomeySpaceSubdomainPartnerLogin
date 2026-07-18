import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, routeForStatus } from "../context/AuthContext";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheck,
  FiGrid,
  FiBarChart2,
  FiUsers,
  FiLayers,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

/* ─── Helper to render the logo without its white background ─── */
function TransparentLogo({ src, color = "original", className, alt = "HomeySpace" }) {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        // Smoothly fade out pixels that are very close to white
        if (brightness >= 253) {
          data[i + 3] = 0; // fully transparent
        } else if (brightness <= 220) {
          if (color === "white") {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        } else {
          // Anti-aliasing transition range
          const factor = (253 - brightness) / (253 - 220);
          data[i + 3] = Math.round(data[i + 3] * factor);
          if (color === "white") {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, color]);

  if (!processedSrc) {
    return <div className={`inline-block bg-transparent ${className}`} style={{ aspectRatio: "1/1" }} />;
  }

  return <img src={processedSrc} alt={alt} className={className} />;
}

/* ═══════════════════════════════════════════════ */
/*                  LOGIN PAGE                     */
/* ═══════════════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();
  const { loginOrSignup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Existing partner -> logs in; new email -> creates the account.
      const data = await loginOrSignup(email.trim(), password);
      const status = data.application_status || data.partner?.application_status || "draft";
      navigate(routeForStatus(status));
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ─────────────── LEFT HERO PANEL ─────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-[#0c635c] via-primary to-primary-light">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative gradient orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.06] blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-24 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl animate-float delay-500" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/[0.03] blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="animate-fade-up">
            <a href="https://homeyspace.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
              <TransparentLogo
                src="/HomeyspaceLogo.png"
                color="white"
                className="h-9 w-auto"
              />
              <span className="text-white text-xl font-bold tracking-tight">HomeySpace</span>
            </a>
          </div>

          {/* Hero copy + feature grid */}
          <div className="space-y-10">
            <div className="space-y-5 animate-fade-up delay-200">
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                Your properties,<br />
                <span className="text-primary-100">one powerful dashboard.</span>
              </h1>
              <p className="text-[15px] text-white/65 max-w-sm leading-relaxed">
                Manage projects, units, sales, and partners from a single
                command center designed for speed.
              </p>
            </div>

            {/* Feature grid — clean, icon-based */}
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {[
                { icon: <FiGrid className="w-[18px] h-[18px]" />, title: "Project Overview", desc: "All sites at a glance" },
                { icon: <FiLayers className="w-[18px] h-[18px]" />, title: "Unit Management", desc: "Floor plans and inventory" },
                { icon: <FiBarChart2 className="w-[18px] h-[18px]" />, title: "Sales Tracking", desc: "Revenue and bookings" },
                { icon: <FiUsers className="w-[18px] h-[18px]" />, title: "Partner Network", desc: "Collaborate seamlessly" },
              ].map((feature, i) => (
                <div
                  key={feature.title}
                  className={`rounded-xl bg-white/[0.06] border border-white/[0.08] px-4 py-4
                             backdrop-blur-sm animate-fade-up delay-${(i + 3) * 100}
                             hover:bg-white/[0.1] hover:border-white/[0.15] hover:-translate-y-0.5
                             transition-all duration-300 ease-out cursor-default`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 mb-3
                                  group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <p className="text-sm font-semibold text-white leading-tight">{feature.title}</p>
                  <p className="text-xs text-white/50 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — minimal copyright */}
          <p className="text-xs text-white/30 animate-fade-in delay-700">
            &copy; {new Date().getFullYear()} HomeySpace Technologies Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* ─────────────── RIGHT LOGIN PANEL ─────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 bg-surface-page">
        <div className="w-full max-w-md space-y-8 animate-scale-in">
          {/* Mobile logo (hidden on desktop where left panel has it) */}
          <a href="https://homeyspace.in/" target="_blank" rel="noopener noreferrer" className="lg:hidden flex items-center gap-3 justify-center mb-2 hover:opacity-90 transition-opacity">
            <TransparentLogo
              src="/HomeyspaceLogo.png"
              color="original"
              className="h-9 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-text-heading">HomeySpace</span>
          </a>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl xl:text-[28px] font-bold text-text-heading tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Sign in to your partner account to continue
            </p>
          </div>

          {/* ─── Social login buttons ─── */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="btn-google-login"
              type="button"
              className="group flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl
                         bg-white border border-border text-sm font-medium text-text-body
                         hover:border-slate-300 hover:bg-slate-50/50 hover:-translate-y-px
                         active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer"
            >
              <FcGoogle className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
              <span>Google</span>
            </button>
            <button
              id="btn-apple-login"
              type="button"
              className="group flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl
                         bg-white border border-border text-sm font-medium text-text-body
                         hover:border-slate-300 hover:bg-slate-50/50 hover:-translate-y-px
                         active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer"
            >
              <FaApple className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
              <span>Apple</span>
            </button>
          </div>

          {/* ─── Divider ─── */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-medium text-text-placeholder uppercase tracking-widest">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* ─── Login form ─── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-text-body uppercase tracking-wider"
              >
                Email address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-input border border-border
                             text-sm text-text-heading placeholder:text-text-placeholder
                             hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                             transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-text-body uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-placeholder group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-surface-input border border-border
                             text-sm text-text-heading placeholder:text-text-placeholder
                             hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/8 focus:border-border-focus
                             transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
                />
                <button
                  type="button"
                  id="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-placeholder
                             hover:text-text-body transition-colors duration-200 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="w-[18px] h-[18px]" /> : <FiEye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="remember"
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-[18px] h-[18px] rounded-md border transition-all duration-300
                               flex items-center justify-center group-hover:border-slate-400
                               ${remember
                                 ? "bg-primary border-primary"
                                 : "bg-white border-border"
                               }`}
                  >
                    <FiCheck className={`w-3 h-3 text-white transition-all duration-200 ${remember ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
                  </div>
                </div>
                <span className="text-sm text-text-muted group-hover:text-text-body transition-colors duration-200 select-none">Remember me</span>
              </label>
              <a
                href="#"
                id="link-forgot-password"
                className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="btn-login-submit"
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2 py-3.5 px-6
                         rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
                         transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Sign in</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* ─── Footer ─── */}
          <p className="text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <a
              href="#"
              id="link-signup"
              className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors duration-200"
            >
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
