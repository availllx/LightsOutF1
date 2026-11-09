"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gauge } from "lucide-react";

export type ResultType = "race" | "sprint";

interface ResultTypeSelectorProps {
  value: ResultType;
  onChange: (value: ResultType) => void;
  hasSprint: boolean;
}

export function ResultTypeSelector({
  value,
  onChange,
  hasSprint,
}: ResultTypeSelectorProps) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
            <Gauge className="h-3 w-3 text-[#e10600]" aria-hidden />
            <span>Session Classification</span>
          </div>
          <p className="mt-1 text-[13px] text-[#aaaaaa]">
            {hasSprint
              ? "Toggle between Feature Race and Sprint classification."
              : "This Grand Prix does not feature a Sprint session."}
          </p>
        </div>

        <Select
          value={value}
          onValueChange={(v) => onChange(v as ResultType)}
          disabled={!hasSprint}
        >
          <SelectTrigger
            className="h-11 w-full rounded-[8px] border border-[#303037] bg-[#1b1b26] text-[13px] font-semibold text-white shadow-none transition-colors hover:border-[#454550] focus:ring-2 focus:ring-[#e0dedc] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Select classification session type"
          >
            <SelectValue placeholder="Session type..." />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border border-[#303037] bg-[#1b1b26] text-white shadow-2xl backdrop-blur-xl">
            <SelectItem
              value="race"
              className="rounded-[6px] text-[13px] text-white focus:bg-[#e10600] focus:text-white"
            >
              Main Race Results
            </SelectItem>
            <SelectItem
              value="sprint"
              disabled={!hasSprint}
              className="rounded-[6px] text-[13px] text-white focus:bg-[#e10600] focus:text-white"
            >
              Sprint Shootout & Race
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
