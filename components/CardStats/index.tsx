import { Badge, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Decimal } from "@prisma/client/runtime/client";

type StatsType = "balance" | "expenses" | "budgets";

interface CardStatsProps {
    type?: StatsType;
    amount?: number | Decimal; // displayed amount (in cents or dollars depending on your app)
    changePct?: number; // optional percent change to show in the badge
}

function formatCurrency(value: number | Decimal) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 2,
    }).format(Number(value));
}

export default function CardStats({
    type = "balance",
    amount = 0,
    changePct = 0,
}: CardStatsProps) {
    let description = "Total Balance";
    let title = formatCurrency(amount);
    let footerMain = "Trending up this month";
    let footerSub = "Sum of all wallets";
    const PositiveIcon = TrendingUpIcon;
    const NegativeIcon = TrendingDownIcon;
    const isPositive = changePct >= 0;

    switch (type) {
        case "balance":
            description = "Total Balance";
            title = formatCurrency(amount);
            footerMain = "Sum of all wallets";
            footerSub = "Updated in real time";
            break;
        case "expenses":
            description = "Total Expenses";
            // show as positive number but could style differently if desired
            title = formatCurrency(amount);
            footerMain = "Expenses this month";
            footerSub = "Categorized expenses";
            break;
        case "budgets":
            description = "Budgets Remaining";
            title = formatCurrency(amount);
            footerMain = "Remaining budget this month";
            footerSub = "Across all active budgets";
            break;
    }

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {title}
                </CardTitle>
                <CardAction>
                    <Badge>
                        {isPositive ? (
                            <PositiveIcon className="size-4" />
                        ) : (
                            <NegativeIcon className="size-4" />
                        )}
                        {isPositive
                            ? `+${Math.abs(changePct)}%`
                            : `-${Math.abs(changePct)}%`}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {footerMain}{" "}
                    {isPositive ? (
                        <TrendingUpIcon className="size-4" />
                    ) : (
                        <TrendingDownIcon className="size-4" />
                    )}
                </div>
                <div className="text-muted-foreground">{footerSub}</div>
            </CardFooter>
        </Card>
    );
}
