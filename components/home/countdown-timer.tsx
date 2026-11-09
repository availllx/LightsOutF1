"use client";

import { useEffect, useState } from "react";
import { Race } from "@/types/f1";
import { getTimeUntilWeekendStart } from "@/lib/race-phase";
import { padTwo } from "@/lib/f1-utils";

interface CountdownTimerProps {
  race: Race;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[10px] border border-[#303037] bg-[#1b1b26] font-mono text-3xl font-black tabular-nums text-white shadow-inner sm:h-[78px] sm:w-[78px] sm:text-4xl transition-colors hover:border-[#454550]">
        {padTwo(value)}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ race }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const time = getTimeUntilWeekendStart(race);
      setTimeLeft({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [race]);

  const ariaLabel = `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until race weekend`;

  return (
    <div
      role="timer"
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-2 sm:gap-3 py-2"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="mb-6 font-mono text-2xl font-black text-[#303037] sm:text-3xl select-none" aria-hidden>:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="mb-6 font-mono text-2xl font-black text-[#303037] sm:text-3xl select-none" aria-hidden>:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="mb-6 font-mono text-2xl font-black text-[#303037] sm:text-3xl select-none" aria-hidden>:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
