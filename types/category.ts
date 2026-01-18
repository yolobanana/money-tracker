export type CategoryType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface SerializedCategory {
    id: string;
    name: string;
    type: CategoryType;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

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
