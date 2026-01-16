"use client";

import { CategoryWithExpenses } from "@/types/category";
import { ChevronDown, ChevronRight, Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

interface CategoryRowProps {
    category: CategoryWithExpenses;
    level?: number;
}

export function CategoryRow({ category, level = 0 }: CategoryRowProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">
                    <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${level * 20}px` }}
                    >
                        {hasChildren ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 hover:bg-transparent"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </Button>
                        ) : (
                            <div className="w-6" /> // Spacer for alignment
                        )}
                        {category.name}
                    </div>
                </TableCell>
                <TableCell>
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            category.type === "INCOME"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : category.type === "EXPENSE"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        )}
                    >
                        {category.type}
                    </span>
                </TableCell>
                <TableCell>
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(category.expenses)}
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                    </Button>
                </TableCell>
            </TableRow>
            {hasChildren && isOpen && (
                <>
                    {category.children!.map((child) => (
                        <CategoryRow
                            key={child.id}
                            category={child}
                            level={level + 1}
                        />
                    ))}
                </>
            )}
        </>
    );
}
