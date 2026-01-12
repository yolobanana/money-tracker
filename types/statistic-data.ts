import { Decimal } from "@prisma/client/runtime/client";

export interface StatisticData {
    totalBalance: number | Decimal;
    totalExpenses: number | Decimal;
    budgetsRemaining: number | Decimal;
}
