import { useState, useEffect } from "react";

/* ─── Logo helper ─── */
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
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness >= 253) {
          data[i + 3] = 0;
        } else if (brightness <= 220) {
          if (color === "white") { data[i] = data[i + 1] = data[i + 2] = 255; }
        } else {
          const factor = (253 - brightness) / (253 - 220);
          data[i + 3] = Math.round(data[i + 3] * factor);
          if (color === "white") { data[i] = data[i + 1] = data[i + 2] = 255; }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, color]);

  if (!processedSrc) return <div className={`inline-block bg-transparent ${className}`} style={{ aspectRatio: "1/1" }} />;
  return <img src={processedSrc} alt={alt} className={className} />;
}

/* ═══════════════════════════════════════════════════════════ */
/*   STATUS LAYOUT — centered card, no sidebar, no nav         */
/*   Used by: Application Submitted + Account Verified         */
/* ═══════════════════════════════════════════════════════════ */
export default function StatusLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-page flex items-center justify-center px-5 py-10 sm:py-16">
      <div className="w-full max-w-[460px] animate-scale-in">

        {/* White card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">

          {/* ── Logo row — inside the card at the top ── */}
          <div className="flex justify-center items-center gap-2.5 px-8 pt-7 pb-6 border-b border-slate-100">
            <a
              href="https://homeyspace.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
            >
              <TransparentLogo src="/HomeyspaceLogo.png" color="original" className="h-7 w-auto" />
              <span className="text-base font-bold tracking-tight text-text-heading">HomeySpace</span>
            </a>
          </div>

          {/* ── Card body ── */}
          <div className="px-8 pt-8 pb-10">
            {children}
          </div>
        </div>

        {/* Footer copyright */}
        <p className="text-center text-xs text-text-placeholder mt-6 animate-fade-in delay-700">
          © {new Date().getFullYear()} HomeySpace Technologies Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}
