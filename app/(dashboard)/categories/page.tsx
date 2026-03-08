import { getCategoryTree } from "@/app/actions/categories";
import { CategoriesClient } from "@/components/categories/CategoriesClient";

export default async function CategoryPage() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const categories = await getCategoryTree(currentYear, currentMonth);

    return <CategoriesClient initialCategories={categories} />;
}
