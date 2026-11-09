"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface CalendarFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function CalendarFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: CalendarFiltersProps) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Search */}
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="calendar-search" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
            <Search className="h-3 w-3 text-[#e10600]" aria-hidden />
            <span>Search Grand Prix</span>
          </label>
          <div className="relative">
            <Input
              id="calendar-search"
              placeholder="Filter by race name, circuit, or country..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 rounded-[8px] border border-[#303037] bg-[#1b1b26] px-3.5 text-[14px] text-white placeholder:text-[#70707c] shadow-none transition-colors hover:border-[#454550] focus:border-[#e10600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc]"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-1.5 sm:w-48">
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
            <Filter className="h-3 w-3 text-[#e10600]" aria-hidden />
            <span>Status</span>
          </label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger
              className="h-11 rounded-[8px] border border-[#303037] bg-[#1b1b26] text-[13px] font-semibold text-white shadow-none transition-colors hover:border-[#454550] focus:ring-2 focus:ring-[#e0dedc] focus:ring-offset-0"
              aria-label="Filter races by status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[10px] border border-[#303037] bg-[#1b1b26] text-white shadow-2xl backdrop-blur-xl">
              <SelectItem value="all" className="text-[13px] focus:bg-[#e10600] focus:text-white rounded-[6px]">
                All Races
              </SelectItem>
              <SelectItem value="upcoming" className="text-[13px] focus:bg-[#e10600] focus:text-white rounded-[6px]">
                Upcoming
              </SelectItem>
              <SelectItem value="finished" className="text-[13px] focus:bg-[#e10600] focus:text-white rounded-[6px]">
                Finished
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
