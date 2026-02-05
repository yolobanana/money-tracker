"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { getTransactions } from "@/app/actions/transaction";
import {
    getMonthlyTransactionStats,
    MonthlyTransactionStats,
} from "@/app/actions/stats";
import TransactionTable from "@/components/transaction-table";
import { TransactionSummaryCards } from "@/components/transactions/TransactionSummaryCards";
import { IncomeExpenseChart } from "@/components/transactions/IncomeExpenseChart";
import { MonthlyTrendChart } from "@/components/transactions/MonthlyTrendChart";
import { MonthSelector } from "@/components/transactions/MonthSelector";
import AddTransactionDialog from "@/components/shared/AddTransactionDialog";
import { TransactionPage } from "@/types/transaction";
import { SerializedWallet } from "@/types/wallet";
import { SerializedCategory } from "@/types/category";

interface TransactionsClientProps {
    initialData: TransactionPage;
    initialStats: MonthlyTransactionStats;
    wallets: SerializedWallet[];
    categories: SerializedCategory[];
    userId: string;
}

export function TransactionsClient({
    initialData,
    initialStats,
    wallets,
    categories,
    userId,
}: TransactionsClientProps) {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth() + 1); // 1-indexed
    const [year, setYear] = useState(now.getFullYear());
    const [page, setPage] = useState(1);
    const [data, setData] = useState<TransactionPage>(initialData);
    const [stats, setStats] = useState<MonthlyTransactionStats>(initialStats);
    const [isPending, startTransition] = useTransition();
    const isFirstRender = useRef(true);

    // Fetch data when month/year/page changes
    useEffect(() => {
        // Skip only on initial render since we already have initialData
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        startTransition(async () => {
            const [newData, newStats] = await Promise.all([
                getTransactions(page, 10, userId, year, month),
                getMonthlyTransactionStats(userId, year, month),
            ]);
            setData(newData);
            setStats(newStats);
        });
    }, [month, year, page, userId]);

    const handleMonthChange = (newMonth: number, newYear: number) => {
        setMonth(newMonth);
        setYear(newYear);
        setPage(1); // Reset to first page when changing month
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Transactions
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your transactions and view spending analysis.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <MonthSelector
                        currentMonth={month}
                        currentYear={year}
                        onMonthChange={handleMonthChange}
                    />
                    <AddTransactionDialog
                        wallets={wallets}
                        categories={categories}
                    />
                </div>
            </div>

            {/* Loading state */}
            {isPending && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Summary Cards */}
            <TransactionSummaryCards
                totalIncome={stats.totalIncome}
                totalExpenses={stats.totalExpenses}
                net={stats.net}
                transactionCount={stats.transactionCount}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IncomeExpenseChart
                    income={stats.totalIncome}
                    expenses={stats.totalExpenses}
                />
                <MonthlyTrendChart data={stats.dailyTrend} />
            </div>

            {/* Transaction Table */}
            <div className="max-w-screen">
                <TransactionTable
                    data={data}
                    wallets={wallets}
                    categories={categories}
                    canEdit={true}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
