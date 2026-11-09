"use client";

import { useEffect, useState } from "react";
import { Race, RaceResult } from "@/types/f1";
import { getCurrentRaces, getRaceResults, getSprintResults } from "@/lib/api";
import { RaceSelector } from "@/components/results/race-selector";
import {
  ResultTypeSelector,
  type ResultType,
} from "@/components/results/result-type-selector";
import { ResultsTable } from "@/components/results/results-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, AlertCircle } from "lucide-react";

export default function ResultsPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [resultType, setResultType] = useState<ResultType>("race");
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRaceInfo, setSelectedRaceInfo] = useState<Race | null>(null);

  // Load available races on mount
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await getCurrentRaces();
        setRaces(data);

        // Find the most recent finished race
        const now = new Date();
        const finishedRaces = data.filter((race) => new Date(race.date) <= now);
        if (finishedRaces.length > 0) {
          const latestRace = finishedRaces[finishedRaces.length - 1];
          setSelectedRound(latestRace.round);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load races"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  // Reset to race results when selected GP has no sprint
  useEffect(() => {
    if (selectedRaceInfo && !selectedRaceInfo.Sprint && resultType === "sprint") {
      setResultType("race");
    }
  }, [selectedRaceInfo, resultType]);

  // Load results when selected race or result type changes
  useEffect(() => {
    if (!selectedRound || races.length === 0) return;

    const selectedRace = races.find((r) => r.round === selectedRound);
    if (!selectedRace) return;

    setSelectedRaceInfo(selectedRace);

    const effectiveType =
      resultType === "sprint" && selectedRace.Sprint ? "sprint" : "race";

    const fetchResults = async () => {
      setResultsLoading(true);
      try {
        const season = new Date(selectedRace.date).getFullYear().toString();
        const data =
          effectiveType === "sprint"
            ? await getSprintResults(season, selectedRound)
            : await getRaceResults(season, selectedRound);
        setResults(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load results"
        );
      } finally {
        setResultsLoading(false);
      }
    };

    fetchResults();
  }, [selectedRound, races, resultType]);

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[14px] border border-[#e10600]/30 bg-[#1e1218] p-8 text-center shadow-xl">
            <AlertCircle className="mx-auto h-8 w-8 text-[#e10600] mb-2" aria-hidden />
            <p className="text-[14px] font-bold text-[#e10600]">Error loading results</p>
            <p className="mt-1 text-[13px] text-[#aaaaaa]">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  const finishedRaces = races.filter((race) => new Date(race.date) <= new Date());
  const hasNoResults = finishedRaces.length === 0;
  const hasSprint = Boolean(selectedRaceInfo?.Sprint);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e10600]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
              Official Classification
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Grand Prix Results
          </h1>
          <p className="text-[13px] text-[#aaaaaa]">
            Full race classifications, timings, grid positions, and championship points
          </p>
        </div>

        {hasNoResults ? (
          <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-12 text-center shadow-xl">
            <p className="text-[15px] font-bold text-white">Season Classification Pending</p>
            <p className="mt-1 text-[13px] text-[#aaaaaa]">
              No finished races yet. Results will populate immediately following the conclusion of Round 1.
            </p>
          </div>
        ) : (
          <>
            {/* Selectors */}
            <div className="grid gap-4 lg:grid-cols-2">
              {loading ? (
                <>
                  <Skeleton className="h-28 w-full rounded-[14px] bg-[#15151e]" />
                  <Skeleton className="h-28 w-full rounded-[14px] bg-[#15151e]" />
                </>
              ) : (
                <>
                  <RaceSelector
                    races={races}
                    selectedRound={selectedRound}
                    onRoundChange={setSelectedRound}
                  />
                  <ResultTypeSelector
                    value={resultType}
                    onChange={setResultType}
                    hasSprint={hasSprint}
                  />
                </>
              )}
            </div>

            {/* Selected GP Headline Card */}
            {selectedRaceInfo && (
              <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] shadow-xl">
                <div className="h-1 w-full bg-gradient-to-r from-[#e10600] to-transparent" />
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-bold tracking-wider text-white bg-[#e10600] px-2 py-0.5 rounded-[4px]">
                          ROUND {selectedRaceInfo.round.padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa]">
                          Official Classification
                        </span>
                      </div>
                      <h2 className="text-2xl font-black uppercase text-white sm:text-3xl">
                        {selectedRaceInfo.raceName}
                      </h2>
                    </div>

                    <div className="space-y-1 text-left sm:text-right">
                      <p className="flex items-center gap-1.5 text-[13px] text-[#aaaaaa] sm:justify-end">
                        <MapPin className="h-3.5 w-3.5 text-[#e10600]" aria-hidden />
                        <span>{selectedRaceInfo.Circuit.Location.locality}, {selectedRaceInfo.Circuit.Location.country}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#aaaaaa] sm:justify-end">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        <span>
                          {new Date(selectedRaceInfo.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Table Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
                  Session:{" "}
                  <span className="text-white">
                    {resultType === "sprint" && hasSprint
                      ? "Sprint Shootout & Race"
                      : "Grand Prix Feature Race"}
                  </span>
                </p>
              </div>

              {resultsLoading ? (
                <div className="space-y-2 overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-4 shadow-xl">
                  <Skeleton className="h-12 w-full bg-[#1b1b26]" />
                  <Skeleton className="h-10 w-full bg-[#1b1b26]" />
                  <Skeleton className="h-10 w-full bg-[#1b1b26]" />
                  <Skeleton className="h-10 w-full bg-[#1b1b26]" />
                  <Skeleton className="h-10 w-full bg-[#1b1b26]" />
                </div>
              ) : (
                <ResultsTable results={results} />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
