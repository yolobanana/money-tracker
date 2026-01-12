export type TransactionPage = {
    transactions: {
        id: string;
        name: string;
        amount: number;
        type: string;
        date: Date;
        wallet: { name: string };
        category: { name: string } | null;
    }[];
    total: number;
    page: number;
    pageSize: number;
};
