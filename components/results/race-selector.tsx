"use client";

import { Race } from "@/types/f1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag } from "lucide-react";

interface RaceSelectorProps {
  races: Race[];
  selectedRound: string;
  onRoundChange: (round: string) => void;
}

export function RaceSelector({
  races,
  selectedRound,
  onRoundChange,
}: RaceSelectorProps) {
  const finishedRaces = races.filter((race) => {
    const raceDate = new Date(race.date);
    return raceDate <= new Date();
  });

  const racesToShow = finishedRaces.length > 0 ? finishedRaces : races;

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
            <Flag className="h-3 w-3 text-[#e10600]" aria-hidden />
            <span>Select Grand Prix</span>
          </div>
          <p className="mt-1 text-[13px] text-[#aaaaaa]">
            Choose a completed race to inspect classification.
          </p>
        </div>

        <Select value={selectedRound} onValueChange={onRoundChange}>
          <SelectTrigger
            className="h-11 w-full rounded-[8px] border border-[#303037] bg-[#1b1b26] text-[13px] font-semibold text-white shadow-none transition-colors hover:border-[#454550] focus:ring-2 focus:ring-[#e0dedc] focus:ring-offset-0"
            aria-label="Select Grand Prix round"
          >
            <SelectValue placeholder="Select race..." />
          </SelectTrigger>
          <SelectContent className="max-h-80 rounded-[10px] border border-[#303037] bg-[#1b1b26] text-white shadow-2xl backdrop-blur-xl">
            {racesToShow.length === 0 ? (
              <div className="px-3 py-2 text-[13px] text-[#aaaaaa]">
                No completed races available
              </div>
            ) : (
              racesToShow.map((race) => {
                const raceDate = new Date(race.date);
                const isFinished = raceDate <= new Date();

                return (
                  <SelectItem
                    key={race.round}
                    value={race.round}
                    className="text-[13px] text-white focus:bg-[#e10600] focus:text-white rounded-[6px]"
                  >
                    <span className="font-mono text-[#aaaaaa]">R{race.round.padStart(2, "0")}</span>
                    {" · "}
                    <span className="font-bold">{race.raceName}</span>
                    {isFinished ? " (Official)" : ""}
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
