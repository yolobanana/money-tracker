"use client";

import { useLinkStatus } from "next/link";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

// Renders a small spinner while the parent <Link> is navigating. Must be
// rendered as a descendant of a <Link> — useLinkStatus reads the pending
// state of the nearest enclosing link. Gives instant feedback on the exact
// item the user clicked, so navigation never feels unresponsive.
export function NavPendingIndicator({ className }: { className?: string }) {
    const { pending } = useLinkStatus();

    if (!pending) return null;

    return (
        <Spinner
            aria-label="Loading page"
            className={cn("size-3.5", className)}
        />
    );
}
