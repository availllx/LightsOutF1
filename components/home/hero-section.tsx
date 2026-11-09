import TextPressure from '@/components/text-pressure';

export function HeroSection() {
  return (
    <section className="space-y-3 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#303037] bg-white/5 px-3.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e10600] animate-pulse" aria-hidden />
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#aaaaaa]">
          Official Formula 1 Dashboard
        </span>
      </div>

      {/* Visually-hidden h1 for screen readers — TextPressure is decorative */}
      <h1 className="sr-only">Formula 1 Dashboard</h1>
      <div className="relative mx-auto h-24 w-full max-w-5xl sm:h-32 lg:h-40" aria-hidden>
        <TextPressure
          text="Formula 1 Dashboard"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#e10600"
          minFontSize={90}
        />
      </div>
      <p className="mx-auto max-w-2xl text-[14px] text-[#aaaaaa] sm:text-[15px]">
        Live transponder timings, world championship standings, race weekend itineraries, and grand prix results.
      </p>
    </section>
  );
}
