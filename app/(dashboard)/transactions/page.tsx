import { getCategories } from "@/app/actions/categories";
import { getTransactions } from "@/app/actions/transaction";
import { getWallets } from "@/app/actions/wallets";
import AddTransactionDialog from "@/components/shared/AddTransactionDialog";
import TransactionTable from "@/components/transaction-table";
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
    const data = await getTransactions(page, 10, user.id);
    const wallets = await getWallets();
    const categoriesData = await getCategories();
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
            </div>
            <div className="max-w-screen">
                <div className="flex justify-start pb-4">
                    <AddTransactionDialog
                        wallets={wallets}
                        categories={categories}
                    />
                </div>
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
