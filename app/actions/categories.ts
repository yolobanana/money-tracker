"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CategoryWithExpenses, ParentCategoryWithExpenses } from "@/types/category";
import { redirect } from "next/navigation";

export async function getCategoryTree(): Promise<CategoryWithExpenses[]> {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }

    const categories = await prisma.category.findMany({
        where: {
            userId: user.id,
        },
        include: {
            transactions: {
                select: {
                    type: true,
                    amount: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Helper to calculate totals
    const calculateTotals = (
        transactions: { type: string; amount: any }[]
    ) => {
        let expenses = 0;
        let income = 0;

        transactions.forEach((t) => {
            const amount = Number(t.amount);
            if (t.type === "EXPENSE") {
                expenses += amount;
            } else if (t.type === "INCOME") {
                income += amount;
            }
        });

        return { expenses, income };
    };

    // Build the tree
    const categoryMap = new Map<string, CategoryWithExpenses>();

    // First pass: create all category objects
    categories.forEach((cat) => {
        const { expenses, income } = calculateTotals(cat.transactions);
        categoryMap.set(cat.id, {
            id: cat.id,
            name: cat.name,
            type: cat.type,
            expenses,
            income,
            parentId: cat.parentId,
            children: [],
        });
    });

    const rootCategories: CategoryWithExpenses[] = [];

    // Second pass: link children to parents
    categoryMap.forEach((cat) => {
        if (cat.parentId && categoryMap.has(cat.parentId)) {
            const parent = categoryMap.get(cat.parentId)!;
            // Limit to 1 level deep as requested?
            // The user said "I will only allow one level deep for the subcategory"
            // This logic builds a full tree if the data supports it, but since the UI
            // and business logic might enforce 1 level deep, this is safe.
            // If we strictly want to flattening anything deeper than level 1, we could check depth here.
            // Assuming data integrity is maintained elsewhere, simple linking is fine.
            parent.children!.push(cat);
        } else {
            rootCategories.push(cat);
        }
    });

    return rootCategories;
}
