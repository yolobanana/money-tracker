import { getWallets, getWalletStats } from "@/app/actions/wallets";
import { CreateWalletDialog } from "@/components/wallets/CreateWalletDialog";
import { WalletCard } from "@/components/wallets/WalletCard";
import { CategoryExpenseChart } from "@/components/wallets/CategoryExpenseChart";

export default async function WalletsPage() {
    const wallets = await getWallets();
    const stats = await getWalletStats();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Wallets
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your wallets and view spending analysis.
                    </p>
                    <div className="pt-2">
                        <CreateWalletDialog />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {wallets.map((wallet) => (
                    <WalletCard key={wallet.id} wallet={wallet} />
                ))}
                {wallets.length === 0 && (
                    <div className="col-span-full flex h-32 flex-col items-center justify-center border border-dashed rounded-lg text-muted-foreground">
                        <p>No wallets found. Create one to get started.</p>
                    </div>
                )}
            </div>

            <div className="grid gap-6">
                <CategoryExpenseChart
                    data={stats}
                    title="Spending by Wallet"
                    description="Distribution of expenses by wallet"
                />
            </div>
        </div>
    );
}
