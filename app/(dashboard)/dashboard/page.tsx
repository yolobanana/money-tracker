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
    searchParams: { page: string };
}) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    const page = Number(searchParams.page) || 1;
    const data = await getTransactions(page, 10, user.id);
    const wallets = await getWallets();
    const categoriesData = await getCategories();

    // Serialize categories for client component
    const categories = categoriesData.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    }));

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">
                    Welcome to your dashboard, {user.name}!
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-4">
                <SectionCards userId={user.id} />
            </div>
            <div className="py-4">Your Transactions</div>
            <div className="flex justify-start pb-4">
                <AddTransactionDialog
                    wallets={wallets}
                    categories={categories}
                />
            </div>
            <TransactionTable data={data} />
        </div>
    );
}
