"use client";

import { useState, useTransition } from "react";
import { getWalletStats } from "@/app/actions/wallets";
import { MonthSelector } from "@/components/transactions/MonthSelector";
import { CreateWalletDialog } from "@/components/wallets/CreateWalletDialog";
import { WalletCard } from "@/components/wallets/WalletCard";
import { CategoryExpenseChart } from "@/components/wallets/CategoryExpenseChart";
import { SerializedWallet } from "@/types/wallet";

interface WalletsClientProps {
    wallets: SerializedWallet[];
    initialStats: { name: string; value: number; type: string }[];
}

export function WalletsClient({ wallets, initialStats }: WalletsClientProps) {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [stats, setStats] = useState(initialStats);
    const [isPending, startTransition] = useTransition();

    const handleMonthChange = (newMonth: number, newYear: number) => {
        setMonth(newMonth);
        setYear(newYear);

        startTransition(async () => {
            const newStats = await getWalletStats(newYear, newMonth);
            setStats(newStats);
        });
    };

    return (
        <div className="flex flex-col gap-8 relative">
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

            {isPending && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

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
                <div className="flex items-center gap-3 self-start mt-2 md:mt-0">
                    <MonthSelector
                        currentMonth={month}
                        currentYear={year}
                        onMonthChange={handleMonthChange}
                    />
                </div>
                <CategoryExpenseChart
                    data={stats}
                    title="Spending by Wallet"
                    description={`Distribution of expenses by wallet for this month`}
                />
            </div>
        </div>
    );
}
