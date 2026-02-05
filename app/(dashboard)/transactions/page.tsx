import { getCategories } from "@/app/actions/categories";
import { getTransactions } from "@/app/actions/transaction";
import { getWallets } from "@/app/actions/wallets";
import { getMonthlyTransactionStats } from "@/app/actions/stats";
import { TransactionsClient } from "@/components/transactions/TransactionsClient";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }

    // Get current month data for initial load
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    console.log("currentMonth", currentMonth);
    console.log("currentYear", currentYear);

    const [data, wallets, categoriesData, monthlyStats] = await Promise.all([
        getTransactions(1, 10, user.id, currentYear, currentMonth),
        getWallets(),
        getCategories(),
        getMonthlyTransactionStats(user.id, currentYear, currentMonth),
    ]);

    const categories = categoriesData.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    }));

    return (
        <TransactionsClient
            initialData={data}
            initialStats={monthlyStats}
            wallets={wallets}
            categories={categories}
            userId={user.id}
        />
    );
}
