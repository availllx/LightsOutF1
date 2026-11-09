import Link from "next/link";
import { Flag, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] shadow-xl">
        {/* Top accent line — consistent with card pattern across the app */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e10600] to-transparent" />
        
        <div className="p-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e10600]/30 bg-[#e10600]/10 px-3.5 py-1 mb-4">
            <Flag className="h-3.5 w-3.5 text-[#e10600]" aria-hidden />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
              404 // Track Limits Exceeded
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Out of Bounds
          </h1>
          <p className="mt-2 text-[14px] text-[#aaaaaa]">
            The race sector, classification, or round you requested is not on the racing line or has been retired.
          </p>

          <div className="mt-8 pt-6 border-t border-[#303037] flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#e10600] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#ff1801] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

