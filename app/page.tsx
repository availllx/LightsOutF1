import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { DashboardNextRaceSection } from "@/components/home/dashboard-next-race-section";
import { TopDriversSection } from "@/components/home/top-drivers-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { getDriverStandings } from "@/lib/api";

function LoadingSkeleton() {
  return (
    <Card className="border-[#303037] bg-[#15151e] rounded-[14px]">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-7 w-48 bg-[#1b1b26]" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
            <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
            <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function DriversStandingsSection() {
  try {
    const standings = await getDriverStandings();

    if (!standings || standings.length === 0) {
      return (
        <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
          <p className="text-[14px] font-medium text-[#aaaaaa]">
            Championship standings will be published immediately after Round 1.
          </p>
        </div>
      );
    }

    return <TopDriversSection standings={standings} />;
  } catch (error) {
    console.error("Error in standings section:", error);
    return (
      <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
        <p className="text-[14px] font-medium text-[#aaaaaa]">
          Championship standings currently unavailable. Check back shortly.
        </p>
      </div>
    );
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Next Race Section */}
        <DashboardNextRaceSection />

        {/* Drivers Standings Section */}
        <Suspense fallback={<LoadingSkeleton />}>
          <DriversStandingsSection />
        </Suspense>
      </div>
    </main>
  );
}
