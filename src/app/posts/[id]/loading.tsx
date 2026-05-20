import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="mb-2 h-12 w-3/4" />
        <Skeleton className="mb-4 h-12 w-1/2" />
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <span>&bull;</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <Skeleton className="mb-8 h-64 w-full rounded-lg md:h-96" />

      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      <Separator className="my-12" />

      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full" />
      </div>
    </article>
  );
}
