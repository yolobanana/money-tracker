export type TransactionPage = {
    transactions: {
        id: string;
        name: string;
        amount: number;
        type: string;
        date: Date;
        walletId: string;
        categoryId: string | null;
        wallet: { name: string };
        category: { name: string } | null;
    }[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
};
