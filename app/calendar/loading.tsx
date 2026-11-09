import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48 bg-[#1b1b26]" />
          <Skeleton className="h-9 w-64 bg-[#1b1b26]" />
          <Skeleton className="h-4 w-80 bg-[#1b1b26]" />
        </div>

        <div className="rounded-[14px] border border-[#303037] bg-[#15151e] p-5 shadow-xl">
          <Skeleton className="h-11 w-full bg-[#1b1b26] rounded-[8px]" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-60 rounded-[14px] border border-[#303037] bg-[#15151e] p-5 space-y-4">
              <Skeleton className="h-6 w-20 bg-[#1b1b26]" />
              <Skeleton className="h-8 w-3/4 bg-[#1b1b26]" />
              <Skeleton className="h-4 w-1/2 bg-[#1b1b26]" />
              <div className="pt-4 border-t border-[#303037]">
                <Skeleton className="h-8 w-full bg-[#1b1b26]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

