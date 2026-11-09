"use client";

import { useEffect, useState } from "react";
import { Race } from "@/types/f1";
import { getCurrentRaces } from "@/lib/api";
import { CalendarFilters } from "@/components/calendar/calendar-filters";
import { RaceCard } from "@/components/calendar/race-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function CalendarPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await getCurrentRaces();
        setRaces(data);
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

  useEffect(() => {
    const filtered = races.filter((race) => {
      const now = new Date();
      const raceDate = new Date(race.date);
      const isUpcoming = raceDate > now;

      // Apply search filter
      const matchesSearch =
        race.raceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.Circuit.Location.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        race.Circuit.circuitName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Apply status filter
      if (statusFilter === "upcoming") return isUpcoming;
      if (statusFilter === "finished") return !isUpcoming;

      return true;
    });

    setFilteredRaces(filtered);
  }, [races, searchTerm, statusFilter]);

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[14px] border border-[#e10600]/30 bg-[#1e1218] p-8 text-center shadow-xl">
            <AlertCircle className="mx-auto h-8 w-8 text-[#e10600] mb-2" aria-hidden />
            <p className="text-[14px] font-bold text-[#e10600]">Error loading calendar</p>
            <p className="mt-1 text-[13px] text-[#aaaaaa]">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e10600]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e10600]">
              FIA Formula One World Championship
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Race Calendar
          </h1>
          <p className="text-[13px] text-[#aaaaaa]">
            Complete season itinerary across {races.length || "all"} official Grand Prix destinations
          </p>
        </div>

        {/* Filters */}
        <CalendarFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Races Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 rounded-[14px] border border-[#303037] bg-[#15151e] p-5 space-y-4">
                <Skeleton className="h-6 w-24 bg-[#1b1b26]" />
                <Skeleton className="h-8 w-3/4 bg-[#1b1b26]" />
                <Skeleton className="h-4 w-1/2 bg-[#1b1b26]" />
                <div className="pt-4 border-t border-[#303037]">
                  <Skeleton className="h-6 w-full bg-[#1b1b26]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRaces.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRaces.map((race) => (
              <RaceCard key={race.round} race={race} />
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-12 text-center shadow-xl">
            <p className="text-[15px] font-bold text-white">No races matched your search criteria</p>
            <p className="mt-1 text-[13px] text-[#aaaaaa]">
              Try adjusting your search terms or status filter.
            </p>
          </div>
        )}

        {/* Results Summary */}
        {!loading && filteredRaces.length > 0 && (
          <div className="border-t border-[#303037] pt-6 text-center text-[12px] font-mono text-[#aaaaaa]">
            Showing {filteredRaces.length} of {races.length} Grand Prix
          </div>
        )}
      </div>
    </main>
  );
}
