"use client";

import {
    createCategory,
    deleteCategory,
    updateCategory,
} from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CategoryWithExpenses } from "@/types/category";
import {
    CreateCategorySchema,
    CreateCategorySchemaType,
} from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CategoryDialogProps {
    category?: CategoryWithExpenses; // If provided, we are in Edit mode
    categories?: CategoryWithExpenses[]; // For parent selection (future)
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CategoryDialog({
    category,
    categories,
    trigger,
    open,
    onOpenChange,
}: CategoryDialogProps) {
    const [isPending, setIsPending] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(open || false);

    const isEditMode = !!category;

    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            name: category?.name || "",
            type: category?.type || "EXPENSE",
            parentId: category?.parentId || null,
        },
    });

    // Reset form when category changes or dialog opens
    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
                type: category.type,
                parentId: category.parentId,
            });
        } else {
            form.reset({
                name: "",
                type: "EXPENSE",
                parentId: null,
            });
        }
    }, [category, form, dialogOpen]);

    const handleOpenChange = useCallback(
        (newOpen: boolean) => {
            setDialogOpen(newOpen);
            if (onOpenChange) {
                onOpenChange(newOpen);
            }
            if (!newOpen) {
                form.reset();
            }
        },
        [onOpenChange, form]
    );

    const onSubmit = async (values: CreateCategorySchemaType) => {
        setIsPending(true);
        try {
            if (isEditMode && category) {
                await updateCategory(category.id, values);
            } else {
                await createCategory(values);
            }
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
            // Handle error (e.g., set form error)
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async () => {
        if (!category) return;

        setIsPending(true);
        try {
            await deleteCategory(category.id);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Category" : "Create Category"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isEditMode}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="INCOME">
                                                Income
                                            </SelectItem>
                                            <SelectItem value="EXPENSE">
                                                Expense
                                            </SelectItem>
                                            <SelectItem value="TRANSFER">
                                                Transfer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="parentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parent Category</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(
                                                value === "null" ? null : value
                                            );
                                            // Auto-sync type if a parent is selected
                                            if (value !== "null") {
                                                const parent = categories?.find(
                                                    (c) => c.id === value
                                                );
                                                if (parent) {
                                                    form.setValue(
                                                        "type",
                                                        parent.type
                                                    );
                                                }
                                            }
                                        }}
                                        value={field.value || "null"}
                                        disabled={
                                            isEditMode && !!category?.parentId
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select parent category (optional)" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="null">
                                                None (Root Category)
                                            </SelectItem>
                                            {categories
                                                ?.filter(
                                                    (c) =>
                                                        c.id !== category?.id &&
                                                        !c.parentId
                                                )
                                                .map((cat) => (
                                                    <SelectItem
                                                        key={cat.id}
                                                        value={cat.id}
                                                    >
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0">
                            {isEditMode && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={isPending}
                                            className="mr-2"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                category and remove it from our
                                                servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-red-600 focus:ring-red-600"
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                            <Button type="submit" disabled={isPending}>
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isEditMode
                                    ? "Save Changes"
                                    : "Create Category"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
