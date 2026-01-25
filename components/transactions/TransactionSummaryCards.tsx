import { TrendingUp, TrendingDown, Receipt } from "lucide-react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface TransactionSummaryCardsProps {
    totalIncome: number;
    totalExpenses: number;
    net: number;
    transactionCount: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function TransactionSummaryCards({
    totalIncome,
    totalExpenses,
    net,
    transactionCount,
}: TransactionSummaryCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Total Income
                    </CardDescription>
                    <CardTitle className="text-xl text-green-600">
                        {formatCurrency(totalIncome)}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        Total Expenses
                    </CardDescription>
                    <CardTitle className="text-xl text-red-600">
                        {formatCurrency(totalExpenses)}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        {net >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        Net Amount
                    </CardDescription>
                    <CardTitle
                        className={`text-xl ${
                            net >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {formatCurrency(net)}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        Transactions
                    </CardDescription>
                    <CardTitle className="text-xl">
                        {transactionCount}
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
}
