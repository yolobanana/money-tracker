"use server";

import { prisma } from "@/lib/prisma";
import { TransactionPage } from "@/types/transaction";
import { getStartOfMonthUTC7, getEndOfMonthUTC7 } from "@/lib/date-utils";

export async function getTransactions(
    page = 1,
    pageSize = 10,
    userId: string,
    year?: number,
    month?: number
): Promise<TransactionPage> {
    const skip = (page - 1) * pageSize;

    // Default to current month if not provided (using UTC+7)
    const now = new Date();
    // Adjust for UTC+7
    const utc7Now = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const targetYear = year ?? utc7Now.getUTCFullYear();
    const targetMonth = month ?? utc7Now.getUTCMonth() + 1; // 1-indexed month

    const startOfMonth = getStartOfMonthUTC7(targetYear, targetMonth);
    const endOfMonth = getEndOfMonthUTC7(targetYear, targetMonth);

    const whereClause = {
        userId: userId,
        date: {
            gte: startOfMonth,
            lt: endOfMonth,
        },
    };

    const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
            where: whereClause,
            orderBy: { date: "desc" },
            skip,
            take: pageSize,
            include: {
                wallet: { select: { name: true } },
                category: { select: { name: true } },
            },
        }),
        prisma.transaction.count({
            where: whereClause,
        }),
    ]);

    const mappedTransactions = transactions.map((t) => ({
        id: t.id,
        name: t.name,
        amount: t.amount.toNumber(),
        type: String(t.type),
        date: t.date,
        walletId: t.walletId,
        categoryId: t.categoryId,
        wallet: t.wallet,
        category: t.category,
    }));

    const totalPages = Math.ceil(total / pageSize);

    return {
        transactions: mappedTransactions,
        total,
        totalPages,
        page,
        pageSize,
    };
}
