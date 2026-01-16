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

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CategoryDialog } from "./CategoryDialog";
import { useState } from "react";

// ... imports

export default function CategoryTable({ data }: CategoryTableProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle>Categories</CardTitle>
                <CategoryDialog
                    open={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    categories={data}
                    trigger={
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    }
                />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">
                                Category
                            </TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
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
                                    categories={data}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
