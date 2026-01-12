import { prisma } from "@/lib/prisma";
import { StatisticData } from "@/types/statistic-data";

export async function getStatisticsData(userId: string): Promise<StatisticData> {
    const totalBalance = await prisma.wallet.aggregate({
        _sum: {
            balance: true,
        },
        where: {
            userId: userId,
        }
    });

    const totalExpenses = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userId: userId,
            type: 'EXPENSE',
            createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
            },
        }
    });

    const allBudgets = await prisma.budget.findMany({
        where: {
            userId: userId,
        }
    });

    let budgetsRemaining = 0;
    for (const budget of allBudgets) {
        const spent = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                userId: userId,
                type: 'EXPENSE',
                categoryId: budget.categoryId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                },
            }
        });

        const budgetAmount = Number(budget.amount) || 0;
        const spentAmount = Number(spent._sum.amount ?? 0) || 0;
        const remaining = budgetAmount - spentAmount;
        budgetsRemaining += remaining > 0 ? remaining : 0;
    }

    return {
        totalBalance: totalBalance._sum.balance || 0,
        totalExpenses: totalExpenses._sum.amount || 0,
        budgetsRemaining: budgetsRemaining,
    };
}
