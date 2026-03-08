import { getWallets, getWalletStats } from "@/app/actions/wallets";
import { WalletsClient } from "@/components/wallets/WalletsClient";

export default async function WalletsPage() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const wallets = await getWallets();
    const stats = await getWalletStats(currentYear, currentMonth);

    return <WalletsClient wallets={wallets} initialStats={stats} />;
}
