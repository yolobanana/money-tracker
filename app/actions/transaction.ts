import { prisma } from "@/lib/prisma";
import { TransactionPage } from "@/types/transaction";

export async function getTransactions(
    page = 1,
    pageSize = 10,
    userId: string
): Promise<TransactionPage> {
    const skip = (page - 1) * pageSize;

    const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
            where: { userId: userId },
            orderBy: { date: "desc" },
            skip,
            take: pageSize,
            include: {
                wallet: { select: { name: true } },
                category: { select: { name: true } },
            },
        }),
        prisma.transaction.count({
            where: { userId: userId },
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
