import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentRaces, getRaceResults, getSprintResults } from "@/lib/api";
import { formatWIBDateShort, formatWIBTime } from "@/lib/timezone";
import { Race } from "@/types/f1";
import { ResultsTable } from "@/components/results/results-table";
import { MapPin, Calendar, Clock, Globe, ArrowLeft } from "lucide-react";

interface RaceDetailPageProps {
  params: Promise<{
    round: string;
  }>;
}

function getRaceSessions(race: Race) {
  return [
    { label: "FP1", session: race.FirstPractice },
    { label: "FP2", session: race.SecondPractice },
    { label: "FP3", session: race.ThirdPractice },
    { label: "Sprint", session: race.Sprint },
    { label: "Qualifying", session: race.Qualifying },
    { label: "Race", session: { date: race.date, time: race.time || "00:00:00Z" } },
  ].filter(
    (
      item
    ): item is {
      label: string;
      session: { date: string; time: string };
    } => Boolean(item.session)
  );
}

export default async function RaceDetailPage({ params }: RaceDetailPageProps) {
  const { round } = await params;
  const races = await getCurrentRaces();
  const race = races.find((item) => item.round === round);

  if (!race) {
    notFound();
  }

  const now = new Date();
  const raceDate = new Date(race.date);
  const isFinished = raceDate <= now;
  const hasSprint = Boolean(race.Sprint);
  const sprintDate = race.Sprint ? new Date(race.Sprint.date) : null;
  const isSprintFinished = Boolean(sprintDate && sprintDate <= now);
  const sessions = getRaceSessions(race);
  const season = new Date(race.date).getFullYear().toString();
  const results = isFinished ? await getRaceResults(season, race.round) : [];
  const sprintResults =
    hasSprint && isSprintFinished
      ? await getSprintResults(season, race.round)
      : [];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation & Status Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#aaaaaa] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc] rounded-[4px] px-1 -ml-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              <span>Back to Calendar</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold tracking-wider text-white bg-[#e10600] px-2.5 py-0.5 rounded-[4px]">
                ROUND {race.round.padStart(2, "0")}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#aaaaaa]">
                FIA Formula One World Championship
              </span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              {race.raceName}
            </h1>
            <p className="text-[14px] text-[#aaaaaa]">
              {race.Circuit.circuitName}
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider ${
              isFinished
                ? "border-[#00d26a]/30 bg-[#00d26a]/10 text-[#00d26a]"
                : "border-[#303037] bg-white/5 text-[#aaaaaa]"
            }`}
          >
            {isFinished ? "Official Results Finalized" : "Upcoming Grand Prix"}
          </span>
        </div>

        {/* Circuit & Event Overview Card */}
        <section className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] shadow-xl">
          <div className="h-1 w-full bg-gradient-to-r from-[#e10600] to-transparent" />
          <div className="p-6">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
                    Location & Destination
                  </p>
                  <h2 className="mt-1 text-2xl font-black uppercase text-white">
                    {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[8px] border border-[#303037] bg-[#1b1b26] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa]">
                      <Calendar className="h-3 w-3 text-[#e10600]" aria-hidden />
                      <span>Race Date</span>
                    </div>
                    <p className="mt-1 text-[14px] font-bold text-white">
                      {formatWIBDateShort(race.date)}
                    </p>
                    <p className="font-mono text-[12px] text-[#aaaaaa]">
                      {formatWIBTime(race.date, race.time)} WIB
                    </p>
                  </div>

                  <div className="rounded-[8px] border border-[#303037] bg-[#1b1b26] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa]">
                      <MapPin className="h-3 w-3 text-[#e10600]" aria-hidden />
                      <span>Coordinates</span>
                    </div>
                    <p className="mt-1 font-mono text-[13px] font-bold text-white">
                      {race.Circuit.Location.lat}, {race.Circuit.Location.long}
                    </p>
                    {race.url && (
                      <a
                        href={race.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#e10600] transition-colors hover:text-white"
                      >
                        <Globe className="h-3 w-3" aria-hidden />
                        <span>Official Ergast Dossier</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Circuit Info Panel */}
              <div className="flex flex-col justify-between rounded-[8px] border border-[#303037] bg-[#1b1b26] p-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#aaaaaa]">
                    Official Circuit
                  </p>
                  <p className="mt-2 text-xl font-black uppercase text-white">
                    {race.Circuit.circuitName}
                  </p>
                  <p className="mt-1 text-[13px] text-[#aaaaaa]">
                    {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#303037] text-[11px] text-[#70707c]">
                  Track Coordinates: {race.Circuit.Location.lat}° N / {race.Circuit.Location.long}° E
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekend Schedule */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Weekend Schedule
            </h2>
            <p className="text-[13px] text-[#aaaaaa]">
              All track session times synchronized to Western Indonesia Time (WIB)
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map(({ label, session }) => {
              const isRace = label === "Race";
              return (
                <div
                  key={label}
                  className={`rounded-[10px] border p-4 transition-colors ${
                    isRace
                      ? "border-[#e10600] bg-[#e10600]/10"
                      : "border-[#303037] bg-[#15151e] hover:border-[#454550]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-[12px] font-black uppercase tracking-wider ${isRace ? "text-[#e10600]" : "text-[#aaaaaa]"}`}>
                      {label}
                    </p>
                    {isRace && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-[#e10600] text-white px-2 py-0.5 rounded-[3px]">
                        Grand Prix
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[14px] font-bold text-white">
                    {formatWIBDateShort(session.date)}
                  </p>
                  <p className="mt-0.5 font-mono text-[12px] font-semibold text-[#aaaaaa]">
                    {formatWIBTime(session.date, session.time)} WIB
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Race Results */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Race Classification
            </h2>
            <p className="text-[13px] text-[#aaaaaa]">
              {isFinished
                ? "Official FIA classification from the race timing transponders."
                : "Results will populate immediately once the chequered flag falls."}
            </p>
          </div>
          {isFinished ? (
            <ResultsTable results={results} />
          ) : (
            <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
              <p className="text-[14px] font-medium text-[#aaaaaa]">
                No race classification available yet. Scheduled start: {formatWIBDateShort(race.date)} at {formatWIBTime(race.date, race.time)} WIB.
              </p>
            </div>
          )}
        </section>

        {/* Sprint Results (if applicable) */}
        {hasSprint && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Sprint Classification
              </h2>
              <p className="text-[13px] text-[#aaaaaa]">
                {isSprintFinished
                  ? "Official classification from the 100km sprint shootout and race."
                  : "Sprint results will appear once the sprint race concludes."}
              </p>
            </div>
            {isSprintFinished ? (
              <ResultsTable results={sprintResults} />
            ) : (
              <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-8 text-center shadow-xl">
                <p className="text-[14px] font-medium text-[#aaaaaa]">
                  No sprint classification available yet for this Grand Prix.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
