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
import AddTransactionDialog from "./shared/AddTransactionDialog";

export default function TransactionTable(data: TransactionPage) {
    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        {data.transactions && (
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(data.transactions &&
                                data.transactions?.map((transaction) => (
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
                                    </TableRow>
                                ))) || (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center"
                                    >
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {data.transactions && (
                        <Pagination>
                            <PaginationContent>
                                {data.page > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/dashboard?page=${
                                                data.page - 1
                                            }`}
                                        />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationLink href="#">
                                        Page {data.page} of {data.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                                {data.page < data.totalPages && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href={`/dashboard?page=${
                                                data.page + 1
                                            }`}
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
