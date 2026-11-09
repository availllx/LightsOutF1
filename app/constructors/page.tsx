import { Suspense } from "react";
import { ConstructorStanding } from "@/types/f1";
import { getConstructorStandings } from "@/lib/api";
import { StandingsTable } from "@/components/standings/standings-table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

function LoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
      <div className="space-y-3">
        <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
        <Skeleton className="h-10 w-full bg-[#1b1b26] rounded-[8px]" />
        <Skeleton className="h-10 w-full bg-[#1b1b26] rounded-[8px]" />
        <Skeleton className="h-10 w-full bg-[#1b1b26] rounded-[8px]" />
        <Skeleton className="h-10 w-full bg-[#1b1b26] rounded-[8px]" />
      </div>
    </div>
  );
}

async function ConstructorsStandingsSection() {
  try {
    const standings = await getConstructorStandings();

    if (!standings || standings.length === 0) {
      return (
        <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-12 text-center shadow-xl">
          <p className="text-[14px] font-medium text-[#aaaaaa]">
            Constructor championship standings will be published after Round 1 concludes.
          </p>
        </div>
      );
    }

    return (
      <StandingsTable
        type="constructor"
        standings={standings as ConstructorStanding[]}
      />
    );
  } catch (error) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-[#e10600]/30 bg-[#1e1218] p-8 text-center shadow-xl">
        <AlertCircle className="mx-auto h-8 w-8 text-[#e10600] mb-2" aria-hidden />
        <p className="text-[14px] font-bold text-[#e10600]">
          Error loading constructor standings
        </p>
        <p className="mt-1 text-[13px] text-[#aaaaaa]">
          {error instanceof Error ? error.message : "Service connection error"}
        </p>
      </div>
    );
  }
}

export default function ConstructorsPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e10600]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
              FIA World Championship
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Constructor Standings
          </h1>
          <p className="text-[13px] text-[#aaaaaa]">
            Current Formula 1 World Constructors Championship classification, accumulated points, and victories
          </p>
        </div>

        {/* Standings Table */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ConstructorsStandingsSection />
        </Suspense>
      </div>
    </main>
  );
}
