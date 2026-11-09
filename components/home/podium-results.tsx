"use client";

import { RaceResult } from "@/types/f1";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

const PODIUM_STYLES: Record<
  number,
  { border: string; position: string }
> = {
  1: {
    border: "border-l-[3px] border-l-[#e10600]",
    position: "text-[#e10600]",
  },
  2: {
    border: "border-l-[3px] border-l-[#c0c0c8]",
    position: "text-[#d0d0d8]",
  },
  3: {
    border: "border-l-[3px] border-l-[#cd7f32]",
    position: "text-[#cd7f32]",
  },
};

function PodiumCard({ result }: { result: RaceResult }) {
  const pos = parseInt(result.position, 10);
  const style = PODIUM_STYLES[pos] ?? PODIUM_STYLES[3];
  const driverCode =
    result.Driver.code ?? result.Driver.familyName.slice(0, 3).toUpperCase();

  return (
    <div
      className={`rounded-[10px] border border-[#303037] bg-[#1b1b26] p-4 transition-colors hover:border-[#454550] ${style.border}`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`font-mono text-3xl font-black tabular-nums ${style.position}`}
        >
          P{result.position}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-lg font-black tracking-wide text-white">
            {driverCode}
          </p>
          <p className="truncate text-[13px] font-semibold text-white">
            {result.Driver.givenName} {result.Driver.familyName}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aaaaaa]">
            {result.Constructor.name}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
            Points
          </p>
          <p className="font-mono text-xl font-black text-white">{result.points}</p>
          {result.Time?.time && (
            <p className="mt-0.5 font-mono text-[11px] text-[#aaaaaa]">
              {result.Time.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface PodiumResultsProps {
  results: RaceResult[];
  loading?: boolean;
}

export function PodiumResults({ results, loading = false }: PodiumResultsProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-[#1b1b26]" />
        <Skeleton className="h-20 w-full rounded-[10px] bg-[#1b1b26]" />
        <Skeleton className="h-20 w-full rounded-[10px] bg-[#1b1b26]" />
        <Skeleton className="h-20 w-full rounded-[10px] bg-[#1b1b26]" />
      </div>
    );
  }

  const podium = results
    .filter((r) => {
      const pos = parseInt(r.position, 10);
      return pos >= 1 && pos <= 3 && r.status === "Finished";
    })
    .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));

  if (podium.length === 0) {
    return (
      <div className="rounded-[10px] border border-[#303037] bg-[#1b1b26] p-6 text-center">
        <p className="text-[13px] text-[#aaaaaa]">
          Official podium results will appear following the race celebration and steward verifications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-[#e10600]" aria-hidden />
        <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-white">
          Podium Classification (P1 - P3)
        </h3>
      </div>

      <div className="grid gap-2.5">
        {podium.map((result) => (
          <PodiumCard key={result.Driver.driverId} result={result} />
        ))}
      </div>
    </div>
  );
}
