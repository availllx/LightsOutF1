import { DriverStanding, ConstructorStanding } from "@/types/f1";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { podiumBorderClass, podiumTextClass } from "@/lib/f1-utils";

interface DriverStandingsTableProps {
  type: "driver";
  standings: DriverStanding[];
}
interface ConstructorStandingsTableProps {
  type: "constructor";
  standings: ConstructorStanding[];
}

const thClass = "bg-transparent text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] py-3.5";

export function StandingsTable(props: DriverStandingsTableProps | ConstructorStandingsTableProps) {
  if (props.standings.length === 0) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] px-6 py-12 text-center shadow-xl">
        <p className="text-[14px] font-medium text-[#aaaaaa]">No standings data available</p>
      </div>
    );
  }

  // ── Driver Standings Table ──
  if (props.type === "driver") {
    const standings = props.standings as DriverStanding[];
    return (
      <Card className="overflow-hidden border border-[#303037] bg-[#15151e] shadow-xl rounded-[14px]">
        <CardContent className="overflow-x-auto p-0">
          <Table className="border-collapse w-full">
            <TableHeader>
              <TableRow className="border-b border-[#303037] bg-[#1b1b26]/60 hover:bg-[#1b1b26]/60">
                <TableHead className={`${thClass} w-16 text-center`}>Pos</TableHead>
                <TableHead className={thClass}>Driver</TableHead>
                <TableHead className={`${thClass} hidden sm:table-cell`}>Constructor</TableHead>
                <TableHead className={`${thClass} text-right`}>Points</TableHead>
                <TableHead className={`${thClass} text-right pr-6`}>Wins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing) => {
                const pos = parseInt(standing.positionText);
                return (
                  <TableRow
                    key={standing.Driver.driverId}
                    className={`border-b border-[#303037]/60 transition-colors hover:bg-[#1b1b26] last:border-0 ${podiumBorderClass(pos)}`}
                  >
                    <TableCell className="w-16 text-center py-3.5">
                      <span className={`font-mono text-[14px] font-black ${podiumTextClass(pos)}`}>
                        {standing.positionText}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-white leading-tight">
                          {standing.Driver.givenName} {standing.Driver.familyName}
                        </span>
                        {standing.Driver.code && (
                          <span className="text-[11px] font-mono font-bold tracking-wider text-[#aaaaaa]">
                            {standing.Driver.code}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-[13px] text-[#aaaaaa] sm:table-cell py-3.5">
                      {standing.Constructors?.[0]?.name || "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono text-[14px] font-black text-white py-3.5">
                      {standing.points}
                    </TableCell>
                    <TableCell className="text-right font-mono text-[13px] text-[#aaaaaa] pr-6 py-3.5">
                      {standing.wins}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // ── Constructor Standings Table ──
  const standings = props.standings as ConstructorStanding[];
  return (
    <Card className="overflow-hidden border border-[#303037] bg-[#15151e] shadow-xl rounded-[14px]">
      <CardContent className="overflow-x-auto p-0">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="border-b border-[#303037] bg-[#1b1b26]/60 hover:bg-[#1b1b26]/60">
              <TableHead className={`${thClass} w-16 text-center`}>Pos</TableHead>
              <TableHead className={thClass}>Constructor</TableHead>
              <TableHead className={`${thClass} text-right`}>Points</TableHead>
              <TableHead className={`${thClass} text-right pr-6`}>Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing) => {
              const pos = parseInt(standing.positionText);
              return (
                <TableRow
                  key={standing.Constructor.constructorId}
                  className={`border-b border-[#303037]/60 transition-colors hover:bg-[#1b1b26] last:border-0 ${podiumBorderClass(pos)}`}
                >
                  <TableCell className="w-16 text-center py-3.5">
                    <span className={`font-mono text-[14px] font-black ${podiumTextClass(pos)}`}>
                      {standing.positionText}
                    </span>
                  </TableCell>
                  <TableCell className="text-[14px] font-bold text-white py-3.5">
                    {standing.Constructor.name}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[14px] font-black text-white py-3.5">
                    {standing.points}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[13px] text-[#aaaaaa] pr-6 py-3.5">
                    {standing.wins}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
