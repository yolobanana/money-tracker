"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    /** Stagger delay in ms applied once the element enters the viewport. */
    delay?: number;
    as?: React.ElementType;
}

/**
 * Fades + slides its children up the first time they scroll into view.
 * Relies on the `.reveal` / `.is-visible` styles in globals.css.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    as: Tag = "div",
}: RevealProps) {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={cn("reveal", visible && "is-visible", className)}
        >
            {children}
        </Tag>
    );
}
