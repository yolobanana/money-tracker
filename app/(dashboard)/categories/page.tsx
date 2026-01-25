import { getCategoryTree } from "@/app/actions/categories";
import CategoryTable from "@/components/CategoryTable";
import { BlockChart } from "@/components/shared/BlockChart";

export default async function CategoryPage() {
    const categories = await getCategoryTree();

    const chartData = categories
        .filter((category) => category.type === "EXPENSE")
        .map((category) => ({
            category: category.name,
            cost: category.expenses,
        }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Categories
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your categories and view spending analysis by its
                        category.
                    </p>
                </div>
            </div>
            <div className="max-w-screen">
                <BlockChart
                    title="Expenses by Category"
                    description="Showing expenses for each category"
                    chartData={chartData}
                />
            </div>
            <div className="max-w-screen">
                <CategoryTable data={categories} />
            </div>
        </div>
    );
}
