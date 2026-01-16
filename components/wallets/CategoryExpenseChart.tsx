"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface CategoryExpenseChartProps {
    data: {
        name: string;
        value: number;
        type: string;
    }[];
    title?: string;
    description?: string;
}

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
];

export function CategoryExpenseChart({
    data,
    title = "Spending by Category",
    description = "Distribution of your expenses",
}: CategoryExpenseChartProps) {
    if (data.length === 0) {
        return (
            <Card className="h-[400px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        No expense data available yet.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="h-[400px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        barSize={30}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                        />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            className="text-xs"
                            tickLine={false}
                            axisLine={false}
                            width={100}
                        />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            formatter={(value: number) =>
                                new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(value)
                            }
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
