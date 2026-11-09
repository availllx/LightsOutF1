import { RaceResult } from "@/types/f1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { podiumBorderClass, podiumTextClass } from "@/lib/f1-utils";

interface ResultsTableProps {
  results: RaceResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
        <p className="text-[14px] font-medium text-[#aaaaaa]">No classification results available for this session</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border border-[#303037] bg-[#15151e] shadow-xl rounded-[14px]">
      <CardContent className="relative overflow-x-auto p-0">
        <Table className="relative table-fixed border-collapse w-full">
          <TableHeader>
            <TableRow className="border-b border-[#303037] bg-[#1b1b26]/60 hover:bg-[#1b1b26]/60">
              <TableHead className="w-16 bg-transparent px-3 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] py-3.5">
                Pos
              </TableHead>
              <TableHead className="w-[42%] bg-transparent px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] sm:w-[32%] py-3.5">
                Driver
              </TableHead>
              <TableHead className="hidden w-[28%] bg-transparent px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] sm:table-cell py-3.5">
                Constructor
              </TableHead>
              <TableHead className="hidden w-20 bg-transparent px-3 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] md:table-cell py-3.5">
                Grid
              </TableHead>
              <TableHead className="w-16 bg-transparent px-3 text-right text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] py-3.5">
                Pts
              </TableHead>
              <TableHead className="hidden w-32 bg-transparent px-3 text-right text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa] lg:table-cell pr-6 py-3.5">
                Time / Gap
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {results.map((result) => {
              const pos = parseInt(result.positionText);
              const isFinished = result.status === "Finished" && result.positionText !== "R";

              return (
                <TableRow
                  key={result.Driver.driverId}
                  className={`border-b border-[#303037]/60 transition-colors hover:bg-[#1b1b26] last:border-0 ${podiumBorderClass(pos)}`}
                >
                  <TableCell className="w-16 px-3 text-center py-3.5">
                    {isFinished ? (
                      <span className={`font-mono text-[14px] font-black ${podiumTextClass(pos)}`}>
                        {result.positionText}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#70707c]">
                        {result.positionText === "R" ? "DNF" : result.status.substring(0, 3)}
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="px-3 py-3.5">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-[14px] font-bold leading-tight text-white">
                        {result.Driver.givenName} {result.Driver.familyName}
                      </span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#aaaaaa]">
                        {result.Driver.code}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden truncate px-3 text-[13px] text-[#aaaaaa] sm:table-cell py-3.5">
                    {result.Constructor.name}
                  </TableCell>

                  <TableCell className="hidden px-3 text-center font-mono text-[13px] text-[#aaaaaa] md:table-cell py-3.5">
                    {result.grid}
                  </TableCell>

                  <TableCell className="px-3 text-right font-mono text-[14px] font-black text-white py-3.5">
                    {result.points}
                  </TableCell>

                  <TableCell className="hidden truncate px-3 text-right font-mono text-[12px] text-[#aaaaaa] lg:table-cell pr-6 py-3.5">
                    {result.Time?.time ?? (
                      <span className="font-bold text-[#e10600]">
                        {result.status}
                      </span>
                    )}
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
