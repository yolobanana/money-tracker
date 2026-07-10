import SectionCards from "@/components/section-cards";
import TransactionTable from "@/components/transaction-table";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTransactions } from "../../actions/transaction";
import { getWallets } from "@/app/actions/wallets";
import { getCategories } from "@/app/actions/categories";
import AddTransactionDialog from "@/components/shared/AddTransactionDialog";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    const { page: pageParam } = await searchParams;
    const page = Number(pageParam) || 1;
    // Fetch in parallel — these requests are independent, so awaiting them
    // one after another needlessly slowed down navigation to the dashboard.
    const [data, wallets, categoriesData] = await Promise.all([
        getTransactions(page, 10, user.id),
        getWallets(),
        getCategories(),
    ]);

    // Serialize categories for client component
    const categories = categoriesData.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    }));

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-xl font-bold sm:text-2xl">
                    Welcome to your dashboard, {user.name}!
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
                <SectionCards userId={user.id} />
            </div>
            <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">Your Transactions</h2>
                <AddTransactionDialog
                    wallets={wallets}
                    categories={categories}
                />
            </div>
            <TransactionTable data={data} />
        </div>
    );
}
