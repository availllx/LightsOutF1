import { DriverStanding } from "@/types/f1";
import { podiumBorderClass, podiumTextClass } from "@/lib/f1-utils";
import Link from "next/link";
import { Trophy, ChevronRight } from "lucide-react";

interface TopDriversSectionProps {
  standings: DriverStanding[];
}

export function TopDriversSection({ standings }: TopDriversSectionProps) {
  const topDrivers = standings.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#303037] px-5 py-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-[#e10600]" aria-hidden />
          <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-white">
            Championship Leaders
          </h3>
        </div>
        <Link
          href="/drivers"
          className="group inline-flex items-center gap-1 rounded-full border border-[#303037] bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] transition-colors hover:border-[#e10600] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc]"
        >
          <span>Full Standings</span>
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#303037] bg-[#1b1b26]/50">
              <th className="w-14 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
                Pos
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
                Driver
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
                Pts
              </th>
              <th className="px-4 py-3 pr-5 text-right text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
                Wins
              </th>
            </tr>
          </thead>
          <tbody>
            {topDrivers.map((standing) => {
              const pos = parseInt(standing.positionText);
              return (
                <tr
                  key={standing.Driver.driverId}
                  className={`border-b border-[#303037]/60 transition-colors hover:bg-[#1b1b26] last:border-0 ${podiumBorderClass(pos)}`}
                >
                  <td className="w-14 px-4 py-3 text-center">
                    <span className={`font-mono text-[14px] font-black ${podiumTextClass(pos)}`}>
                      {standing.positionText}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-bold text-white leading-tight">
                        {standing.Driver.givenName} {standing.Driver.familyName}
                      </span>
                      {standing.Constructors?.[0] && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#aaaaaa]">
                          {standing.Constructors[0].name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[14px] font-black text-white">
                    {standing.points}
                  </td>
                  <td className="px-4 py-3 pr-5 text-right font-mono text-[13px] text-[#aaaaaa]">
                    {standing.wins}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
