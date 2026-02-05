"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

interface MonthSelectorProps {
    currentMonth: number;
    currentYear: number;
    onMonthChange: (month: number, year: number) => void;
}

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function generateMonthOptions() {
    const options: { label: string; month: number; year: number }[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-indexed

    // Generate last 12 months
    for (let i = 0; i < 12; i++) {
        let month = currentMonth - i;
        let year = currentYear;

        if (month <= 0) {
            month += 12;
            year -= 1;
        }

        options.push({
            label: `${MONTH_NAMES[month - 1]} ${year}`,
            month,
            year,
        });
    }

    return options;
}

export function MonthSelector({
    currentMonth,
    currentYear,
    onMonthChange,
}: MonthSelectorProps) {
    const options = generateMonthOptions();

    const currentValue = `${currentMonth}-${currentYear}`;

    const handleChange = (value: string) => {
        const [month, year] = value.split("-").map(Number);
        onMonthChange(month, year);
    };

    return (
        <Select value={currentValue} onValueChange={handleChange}>
            <SelectTrigger className="w-[200px]">
                <CalendarDays className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={`${option.month}-${option.year}`}
                        value={`${option.month}-${option.year}`}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
