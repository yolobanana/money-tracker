"use client";

import { TransactionPage } from "@/types/transaction";
import { Card, CardContent } from "./ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SerializedWallet } from "@/types/wallet";
import { SerializedCategory } from "@/types/category";
import EditTransactionDialog from "./shared/EditTransactionDialog";

export default function TransactionTable({
    data,
    wallets = [],
    categories = [],
    canEdit = false,
}: {
    data: TransactionPage;
    wallets?: SerializedWallet[];
    categories?: SerializedCategory[];
    canEdit?: boolean;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        router.refresh();
    };

    console.log("page:", data.page);

    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        {data.transactions && data.transactions.length > 0 && (
                            <TableCaption>
                                A list of your recent Transactions.
                            </TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">
                                    Name
                                </TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Wallet</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                {canEdit && (
                                    <TableHead className="w-[100px]">
                                        Action
                                    </TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.transactions &&
                            data.transactions.length > 0 ? (
                                data.transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">
                                            {transaction.name}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.category?.name}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.wallet.name}
                                        </TableCell>
                                        <TableCell>
                                            Rp
                                            {transaction.amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.date.toLocaleDateString()}
                                        </TableCell>
                                        {canEdit && (
                                            <TableCell>
                                                <EditTransactionDialog
                                                    transaction={transaction}
                                                    wallets={wallets}
                                                    categories={categories}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={canEdit ? 6 : 5}
                                        className="text-center"
                                    >
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {data.transactions && data.transactions.length > 0 && (
                        <Pagination>
                            <PaginationContent>
                                {data.page > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigateToPage(data.page - 1);
                                            }}
                                        />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    Page {data.page} of {data.totalPages}
                                </PaginationItem>
                                {data.page < data.totalPages && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigateToPage(data.page + 1);
                                            }}
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
