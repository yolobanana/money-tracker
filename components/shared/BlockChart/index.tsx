"use client";

import { TrendingUp } from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartConfig = {
    cost: {
        label: "Cost",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export type BlockChartProps = {
    title: string;
    description?: string;
    chartData: { category: string; cost: number }[];
};

export function BlockChart(props: BlockChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                {props.description && (
                    <CardDescription>{props.description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="overflow-x-auto">
                {(props.chartData.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[300px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={props.chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Bar dataKey="cost" fill="#333" radius={8}>
                                <LabelList
                                    className="fill-foreground"
                                    fontSize={12}
                                    offset={12}
                                    position="top"
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                )) || (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-muted-foreground">
                            No data available
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
