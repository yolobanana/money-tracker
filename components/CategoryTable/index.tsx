"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { CategoryRow } from "./CategoryRow";
import { CategoryWithExpenses } from "@/types/category";

interface CategoryTableProps {
    data: CategoryWithExpenses[];
}

export default function CategoryTable({ data }: CategoryTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">
                                Category
                            </TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Expenses</TableHead>
                            <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center"
                                >
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((category) => (
                                <CategoryRow
                                    key={category.id}
                                    category={category}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
