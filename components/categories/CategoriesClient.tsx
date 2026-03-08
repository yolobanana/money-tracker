"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { getCategoryTree } from "@/app/actions/categories";
import { MonthSelector } from "@/components/transactions/MonthSelector";
import CategoryTable from "@/components/CategoryTable";
import { BlockChart } from "@/components/shared/BlockChart";
import { CategoryWithExpenses } from "@/types/category";
import { useDateFilterStore } from "@/store/useDateFilterStore";

interface CategoriesClientProps {
    initialCategories: CategoryWithExpenses[];
}

export function CategoriesClient({ initialCategories }: CategoriesClientProps) {
    const { month, year, setMonthYear } = useDateFilterStore();
    const [categories, setCategories] =
        useState<CategoryWithExpenses[]>(initialCategories);
    const [isPending, startTransition] = useTransition();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            const now = new Date();
            if (month === now.getMonth() + 1 && year === now.getFullYear()) {
                return;
            }
        }

        startTransition(async () => {
            const newCategories = await getCategoryTree(year, month);
            setCategories(newCategories);
        });
    }, [month, year]);

    const handleMonthChange = (newMonth: number, newYear: number) => {
        setMonthYear(newMonth, newYear);
    };

    const chartData = categories
        .filter((category) => category.type === "EXPENSE")
        .map((category) => ({
            category: category.name,
            cost: category.expenses,
        }));

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Categories
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your categories and view spending analysis by its
                        category.
                    </p>
                </div>
                <div className="flex items-center gap-3 self-start mt-2 md:mt-0">
                    <MonthSelector
                        currentMonth={month}
                        currentYear={year}
                        onMonthChange={handleMonthChange}
                    />
                </div>
            </div>

            {isPending && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            <div className="max-w-screen">
                <BlockChart
                    title="Expenses by Category"
                    description={`Showing expenses for each category this month`}
                    chartData={chartData}
                />
            </div>
            <div className="max-w-screen">
                <CategoryTable data={categories} />
            </div>
        </div>
    );
}
