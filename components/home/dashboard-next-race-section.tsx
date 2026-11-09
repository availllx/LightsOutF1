"use client";

import { useEffect, useMemo, useState } from "react";
import { Race } from "@/types/f1";
import { getCurrentRaces } from "@/lib/api";
import {
  getRacePhase,
  getRaceStartTime,
  getWeekendStartTime,
  type RacePhase,
} from "@/lib/race-phase";
import { NextRaceCard } from "./next-race-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function pickDashboardRace(races: Race[], now: Date): Race | null {
  const byPhase = (phase: RacePhase) =>
    races.filter((race) => getRacePhase(race, now) === phase);

  const pickEarliest = (items: Race[], timeFn: (r: Race) => Date) => {
    if (items.length === 0) return null;
    return [...items].sort((a, b) => timeFn(a).getTime() - timeFn(b).getTime())[0];
  };

  // Priority: race live grid > podium window > weekend (FP1 started) > next upcoming
  const grid = byPhase("grid");
  const post = byPhase("post");
  const weekend = byPhase("weekend");
  const before = byPhase("before");

  return (
    pickEarliest(grid, getRaceStartTime) ??
    pickEarliest(post, getRaceStartTime) ??
    pickEarliest(weekend, getWeekendStartTime) ??
    pickEarliest(before, getWeekendStartTime)
  );
}

export function DashboardNextRaceSection() {
  const [races, setRaces] = useState<Race[]>([]);
  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        setLoading(true);
        const data = await getCurrentRaces();
        setRaces(data);

        const selected = pickDashboardRace(data, new Date());
        setRace(selected);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  // Keep switching to next GP as time progresses (no refresh needed).
  useEffect(() => {
    if (races.length === 0) return;

    const tick = () => {
      const selected = pickDashboardRace(races, new Date());
      setRace(selected);
    };

    tick();
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, [races]);

  const hasRace = Boolean(race);

  const skeleton = useMemo(() => {
    return (
      <Card className="border-[#303037] bg-[#15151e] rounded-[14px] shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-[#1b1b26]" />
            <Skeleton className="h-8 w-2/3 bg-[#1b1b26]" />
            <Skeleton className="h-4 w-1/3 bg-[#1b1b26]" />
            <div className="space-y-2 pt-4 border-t border-[#303037]">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-[#1b1b26] rounded-[8px]" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }, []);

  if (loading) return skeleton;

  if (!hasRace) {
    return (
      <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
        <p className="text-[14px] font-medium text-[#aaaaaa]">No upcoming races currently scheduled</p>
      </div>
    );
  }

  return <NextRaceCard race={race!} />;
}
