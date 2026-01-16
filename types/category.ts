export type CategoryType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface CategoryWithExpenses {
    id: string;
    name: string;
    type: CategoryType;
    expenses: number;
    income: number;
    parentId: string | null;
    children?: CategoryWithExpenses[];
}

export interface ParentCategoryWithExpenses {
    id: string;
    name: string;
    type: CategoryType;
    expenses: number;
}
