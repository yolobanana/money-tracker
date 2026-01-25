import { getCategories } from "@/app/actions/categories";
import { getTransactions } from "@/app/actions/transaction";
import { getWallets } from "@/app/actions/wallets";
import { getMonthlyTransactionStats } from "@/app/actions/stats";
import AddTransactionDialog from "@/components/shared/AddTransactionDialog";
import TransactionTable from "@/components/transaction-table";
import { TransactionSummaryCards } from "@/components/transactions/TransactionSummaryCards";
import { IncomeExpenseChart } from "@/components/transactions/IncomeExpenseChart";
import { MonthlyTrendChart } from "@/components/transactions/MonthlyTrendChart";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TransactionsPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    const page = Number(searchParams.page) || 1;

    const [data, wallets, categoriesData, monthlyStats] = await Promise.all([
        getTransactions(page, 10, user.id),
        getWallets(),
        getCategories(),
        getMonthlyTransactionStats(user.id),
    ]);

    const categories = categoriesData.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    }));

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
                <AddTransactionDialog
                    wallets={wallets}
                    categories={categories}
                />
            </div>

            {/* Summary Cards */}
            <TransactionSummaryCards
                totalIncome={monthlyStats.totalIncome}
                totalExpenses={monthlyStats.totalExpenses}
                net={monthlyStats.net}
                transactionCount={monthlyStats.transactionCount}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IncomeExpenseChart
                    income={monthlyStats.totalIncome}
                    expenses={monthlyStats.totalExpenses}
                />
                <MonthlyTrendChart data={monthlyStats.dailyTrend} />
            </div>

            {/* Transaction Table */}
            <div className="max-w-screen">
                <TransactionTable
                    data={data}
                    wallets={wallets}
                    categories={categories}
                    canEdit={true}
                />
            </div>
        </div>
    );
}
