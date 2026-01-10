"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-lg bg-background/80 backdrop-blur border transition-transform duration-300 hover:rotate-12"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
