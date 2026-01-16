import SectionCards from "@/components/section-cards";
import TransactionTable from "@/components/transaction-table";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTransactions } from "../../actions/transaction";

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

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Welcome to your dashboard, {user.name}!
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-4">
                    <SectionCards userId={user.id} />
                </div>
                <TransactionTable {...data} />
            </h1>
        </div>
    );
}
