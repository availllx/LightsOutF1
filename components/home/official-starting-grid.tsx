"use client";

import { QualifyingResult } from "@/types/f1";
import { Skeleton } from "@/components/ui/skeleton";
import { podiumBorderClass, podiumTextClass } from "@/lib/f1-utils";

function getBestQualifyingTime(result: QualifyingResult): string {
  return result.Q3 || result.Q2 || result.Q1 || "—";
}

function GridRow({ result }: { result: QualifyingResult }) {
  const pos = parseInt(result.position, 10);
  const driverCode = result.Driver.code ?? result.Driver.familyName.slice(0, 3).toUpperCase();
  const time = getBestQualifyingTime(result);

  return (
    <div
      className={`flex items-center gap-3 rounded-[8px] border border-[#303037] bg-[#1b1b26] px-3.5 py-2.5 transition-colors hover:border-[#454550] ${podiumBorderClass(pos)}`}
    >
      <span className={`w-6 shrink-0 text-center font-mono text-[13px] font-black ${podiumTextClass(pos)}`}>
        {result.position}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[13px] font-bold tracking-wide text-white">
            {driverCode}
          </span>
          <span className="truncate text-[11px] text-[#aaaaaa]">
            {result.Constructor.name}
          </span>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[12px] font-semibold text-[#aaaaaa]">{time}</span>
    </div>
  );
}

interface OfficialStartingGridProps {
  results: QualifyingResult[];
  loading?: boolean;
}

export function OfficialStartingGrid({
  results,
  loading = false,
}: OfficialStartingGridProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48 bg-[#1b1b26]" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full rounded-[8px] bg-[#1b1b26]" />
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full rounded-[8px] bg-[#1b1b26]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-[10px] border border-[#303037] bg-[#1b1b26] p-6 text-center">
        <p className="text-[13px] text-[#aaaaaa]">
          Official starting grid will be published upon conclusion of Qualifying session.
        </p>
      </div>
    );
  }

  const sorted = [...results].sort(
    (a, b) => parseInt(a.position, 10) - parseInt(b.position, 10)
  );
  const topTen = sorted.filter((r) => parseInt(r.position, 10) <= 10);
  const bottomTen = sorted.filter((r) => parseInt(r.position, 10) > 10);

  return (
    <div className="space-y-4">
      {/* Live header */}
      <div className="flex flex-wrap items-center gap-3" aria-live="polite" aria-atomic="false">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e10600] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e10600]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
            Live Track
          </span>
        </div>
        <h3 className="text-[13px] font-black uppercase tracking-wider text-white">
          Official Starting Grid
        </h3>
        <span className="rounded-full border border-[#00d26a]/30 bg-[#00d26a]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00d26a]">
          Green Flag
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaaaaa]">
            P1 – P10 Front Runners
          </p>
          {topTen.map((result) => (
            <GridRow key={result.Driver.driverId} result={result} />
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaaaaa]">
            P11 – P20 Midfield & Rear
          </p>
          {bottomTen.map((result) => (
            <GridRow key={result.Driver.driverId} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}
