"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/shared/nav-items";

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
            <div className="flex w-full max-w-md items-center justify-around gap-1 rounded-2xl border bg-background/80 p-1.5 shadow-lg backdrop-blur-lg">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.url ||
                        pathname.startsWith(item.url + "/");
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[0.65rem] font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "size-5 transition-transform",
                                    isActive && "scale-110",
                                )}
                            />
                            <span className="leading-none">{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
