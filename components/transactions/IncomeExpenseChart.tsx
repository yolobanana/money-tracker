"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface IncomeExpenseChartProps {
    income: number;
    expenses: number;
}

const COLORS = ["#22c55e", "#ef4444"]; // green for income, red for expenses

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function IncomeExpenseChart({
    income,
    expenses,
}: IncomeExpenseChartProps) {
    const data = [
        { name: "Income", value: income },
        { name: "Expenses", value: expenses },
    ];

    const hasData = income > 0 || expenses > 0;

    return (
        <Card className="h-[350px]">
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>This month&apos;s comparison</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) =>
                                    formatCurrency(value)
                                }
                            />
                            <Legend />
                        </PieChart>
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
