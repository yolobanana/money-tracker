"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface MonthlyTrendChartProps {
    data: { date: string; income: number; expenses: number }[];
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
    // Format date labels to show just the day number
    const formattedData = data.map((item) => ({
        ...item,
        day: new Date(item.date).getDate().toString(),
    }));

    const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

    return (
        <Card className="h-[350px]">
            <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
                <CardDescription>Daily income and expenses</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) =>
                                    value >= 1000000
                                        ? `${(value / 1000000).toFixed(0)}M`
                                        : value >= 1000
                                        ? `${(value / 1000).toFixed(0)}K`
                                        : value
                                }
                            />
                            <Tooltip
                                formatter={(value: number) =>
                                    formatCurrency(value)
                                }
                                labelFormatter={(label) => `Day ${label}`}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={false}
                                name="Income"
                            />
                            <Line
                                type="monotone"
                                dataKey="expenses"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={false}
                                name="Expenses"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No transactions this month
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
