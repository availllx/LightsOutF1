import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 bg-[#1b1b26]" />
          <Skeleton className="h-9 w-64 bg-[#1b1b26]" />
          <Skeleton className="h-4 w-96 bg-[#1b1b26]" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-28 w-full rounded-[14px] bg-[#15151e]" />
          <Skeleton className="h-28 w-full rounded-[14px] bg-[#15151e]" />
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
          <div className="space-y-3">
            <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-[#1b1b26] rounded-[8px]" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

