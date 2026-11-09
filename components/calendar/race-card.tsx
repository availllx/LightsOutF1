import Link from "next/link";
import { Race } from "@/types/f1";
import { Card, CardContent } from "@/components/ui/card";
import { formatWIBDateShort, formatWIBTime } from "@/lib/timezone";
import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const raceDate = new Date(race.date);
  const now = new Date();
  const isUpcoming = raceDate > now;
  const isFinished = raceDate <= now;

  const formattedDate = formatWIBDateShort(race.date);
  const formattedTime = formatWIBTime(race.date, race.time);
  const sessions = [
    { label: "FP1", session: race.FirstPractice },
    { label: "FP2", session: race.SecondPractice },
    { label: "FP3", session: race.ThirdPractice },
    { label: "Sprint", session: race.Sprint },
    { label: "Qualifying", session: race.Qualifying },
  ].filter(
    (
      item
    ): item is {
      label: string;
      session: { date: string; time: string };
    } => Boolean(item.session)
  );

  return (
    <Card className="group overflow-hidden border border-[#303037] bg-[#15151e] transition-all duration-200 hover:border-[#e10600] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] rounded-[14px]">
      {/* Top Motorsport Accent Line */}
      <div className={`h-1 w-full ${isUpcoming ? "bg-gradient-to-r from-[#e10600] to-transparent" : "bg-[#303037]"}`} />

      <CardContent className="p-0">
        {/* Card Header & GP Info */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-[11px] font-bold tracking-wider text-white bg-[#e10600] px-2.5 py-0.5 rounded-[4px]">
              R{race.round.padStart(2, "0")}
            </span>
            {isUpcoming && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] bg-white/5 border border-[#303037] px-2.5 py-0.5 rounded-full">
                Upcoming
              </span>
            )}
            {isFinished && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00d26a] bg-[#00d26a]/10 border border-[#00d26a]/20 px-2.5 py-0.5 rounded-full">
                Finished
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-[18px] font-black uppercase text-white leading-tight group-hover:text-[#e10600] transition-colors">
              {race.raceName}
            </h3>
            <p className="flex items-center gap-1.5 text-[13px] text-[#aaaaaa]">
              <MapPin className="h-3.5 w-3.5 text-[#e10600] shrink-0" aria-hidden />
              <span className="truncate">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</span>
            </p>
            <p className="text-[11px] text-[#70707c] truncate pl-5">
              {race.Circuit.circuitName}
            </p>
          </div>
        </div>

        {/* Date, Time & Action bar */}
        <div className="border-t border-[#303037] bg-[#1b1b26]/50 px-5 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-white">
                <Calendar className="h-3.5 w-3.5 text-[#aaaaaa]" aria-hidden />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#aaaaaa]">
                <Clock className="h-3 w-3" aria-hidden />
                <span>{formattedTime} WIB</span>
              </div>
            </div>
            <Link
              href={`/calendar/${race.round}`}
              className="inline-flex items-center gap-1 rounded-full border border-[#303037] bg-[#15151e] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:border-[#e10600] hover:bg-[#e10600] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc]"
              aria-label={`View details for ${race.raceName}`}
            >
              <span>Details</span>
              <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>

          {/* Quick sessions preview */}
          {sessions.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-[#303037]/50 grid grid-cols-2 gap-1.5">
              {sessions.slice(0, 4).map(({ label, session }) => (
                <div
                  key={label}
                  className="rounded-[6px] border border-[#303037]/60 bg-[#15151e]/60 px-2 py-1 text-[11px]"
                >
                  <span className="font-bold text-[#aaaaaa]">{label}: </span>
                  <span className="font-mono text-white">{formatWIBDateShort(session.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
