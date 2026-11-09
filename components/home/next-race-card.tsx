import { Race } from "@/types/f1";
import { RacePhaseContent, RacePhaseLabel } from "./race-phase-content";
import { Card, CardContent } from "@/components/ui/card";
import { toWIBTime, formatWIBTime } from "@/lib/timezone";
import { Calendar, MapPin } from "lucide-react";

interface NextRaceCardProps {
  race: Race;
}

export function NextRaceCard({ race }: NextRaceCardProps) {
  const { date: formattedDate } = toWIBTime(race.date);

  const sessions = [
    { name: "FP1", time: race.FirstPractice?.time, date: race.FirstPractice?.date },
    { name: "FP2", time: race.SecondPractice?.time, date: race.SecondPractice?.date },
    { name: "FP3", time: race.ThirdPractice?.time, date: race.ThirdPractice?.date },
    { name: "Q", time: race.Qualifying?.time, date: race.Qualifying?.date },
    { name: "Race", time: race.time, date: race.date },
  ]
    .filter((s) => s.time)
    .map((s) => ({
      ...s,
      wibTime: formatWIBTime(s.date || race.date, s.time),
    }));

  return (
    <Card className="overflow-hidden border border-[#303037] bg-[#15151e] shadow-xl rounded-[14px] transition-colors hover:border-[#454550]">
      {/* Top Motorsport Accent Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#e10600] via-[#e10600] to-transparent" />

      {/* Header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e10600]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#aaaaaa]">
              Grand Prix Schedule
            </span>
          </div>
          <span className="rounded-full border border-[#303037] bg-white/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa]">
            Round {race.round}
          </span>
        </div>

        {/* Race info */}
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            {race.raceName}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#aaaaaa]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#e10600]" aria-hidden />
              <span>{race.Circuit.Location.locality}, {race.Circuit.Location.country}</span>
            </span>
            <span className="text-[#70707c]">•</span>
            <span className="text-[#70707c]">{race.Circuit.circuitName}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] font-bold text-[#e10600]">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#303037]" />

      <CardContent className="p-5 sm:p-6 pt-5">
        <div className="mb-4">
          <RacePhaseLabel race={race} />
        </div>
        <RacePhaseContent race={race} />

        {/* Sessions */}
        <div className="mt-6 border-t border-[#303037] pt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#aaaaaa] mb-3">
            Weekend Sessions (WIB)
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {sessions.map((session) => {
              const isRace = session.name === "Race";
              return (
                <div
                  key={session.name}
                  className={`rounded-[8px] border p-2.5 text-center transition-all ${
                    isRace
                      ? "border-[#e10600] bg-[#e10600]/10"
                      : "border-[#303037] bg-[#1b1b26] hover:border-[#454550]"
                  }`}
                >
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isRace ? "text-[#e10600]" : "text-[#aaaaaa]"}`}>
                    {session.name}
                  </p>
                  <p className="mt-1 font-mono text-[12px] font-semibold text-white">
                    {session.wibTime}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
