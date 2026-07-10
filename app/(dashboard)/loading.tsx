import { Skeleton } from "@/components/ui/skeleton";

// Shown instantly while a dashboard route's server component fetches data.
// Because this lives in the (dashboard) segment it renders inside the
// persistent layout (sidebar/header stay put), so client-side navigation
// gives immediate feedback instead of a frozen, unresponsive delay.
export default function DashboardLoading() {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Skeleton className="h-7 w-64" />
            </div>

            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-xl" />
                ))}
            </div>

            <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-9 w-36" />
            </div>

            <div className="space-y-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
            </div>
        </div>
    );
}
