import { getStatisticsData } from "@/app/actions/stats";
import CardStats from "./CardStats";

export default async function SectionCards({ userId }: { userId: string }) {
    const stats = await getStatisticsData(userId);
    console.log("Statistics Data:", stats);
    return (
        <>
            <CardStats type="balance" amount={stats.totalBalance} />
            <CardStats type="expenses" amount={stats.totalExpenses} />
            <CardStats type="budgets" amount={stats.budgetsRemaining} />
        </>
    );
}
