"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    createTransactionSchema,
    CreateTransactionInput,
} from "@/schemas/transaction.schema";
import { createTransaction } from "@/app/actions/transactions";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SerializedWallet } from "@/types/wallet";
import { SerializedCategory } from "@/types/category";
import { DatePicker } from "@/components/ui/date-picker";
import CreateCategoryDialog from "@/components/shared/CreateCategoryDialog";
import { AlertCircle } from "lucide-react";

interface AddTransactionDialogProps {
    wallets: SerializedWallet[];
    categories: SerializedCategory[];
}

export default function AddTransactionDialog({
    wallets,
    categories,
}: AddTransactionDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState<"INCOME" | "EXPENSE" | "TRANSFER">(
        "EXPENSE"
    );

    const form = useForm<CreateTransactionInput>({
        resolver: zodResolver(createTransactionSchema) as any,
        defaultValues: {
            amount: 0,
            date: new Date(),
            description: "",
            type: "EXPENSE",
            walletId: wallets?.[0]?.id || "",
            categoryId: categories?.find((c) => c.type === "EXPENSE")?.id || "",
        } as any,
    });

    const filteredCategories = categories?.filter((c) => c.type === type) || [];
    const hasCategories = filteredCategories.length > 0;
    const isCategoryRequired = type !== "TRANSFER";
    const canSubmit =
        !isCategoryRequired || (hasCategories && form.watch("categoryId"));

    // Reset validation when type changes
    useEffect(() => {
        form.setValue("type", type);
        form.clearErrors();
        // Reset specific fields if needed
    }, [type, form]);

    const onSubmit = async (data: CreateTransactionInput) => {
        setIsLoading(true);
        try {
            await createTransaction(data);
            toast.success("Transaction created successfully");
            setOpen(false);
            form.reset({
                amount: 0,
                date: new Date(),
                description: "",
                type: type,
                walletId: wallets?.[0]?.id || "",
                categoryId: categories?.find((c) => c.type === type)?.id || "",
                destinationWalletId: wallets?.[1]?.id || wallets?.[0]?.id || "",
            } as any);
        } catch (error) {
            toast.error("Failed to create transaction");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Create a new transaction.
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    value={type}
                    onValueChange={(v) => setType(v as any)}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="INCOME">Income</TabsTrigger>
                        <TabsTrigger value="EXPENSE">Expense</TabsTrigger>
                        <TabsTrigger value="TRANSFER">Transfer</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 pt-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                className="text-right"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value}
                                                setDate={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description (Optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Lunch"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {type === "TRANSFER" ? (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="walletId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>From Wallet</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select wallet" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {wallets.map((wallet) => (
                                                        <SelectItem
                                                            key={wallet.id}
                                                            value={wallet.id}
                                                        >
                                                            {wallet.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="destinationWalletId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>To Wallet</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select wallet" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {wallets.map((wallet) => (
                                                        <SelectItem
                                                            key={wallet.id}
                                                            value={wallet.id}
                                                        >
                                                            {wallet.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="walletId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Wallet</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select wallet" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {wallets.map((wallet) => (
                                                        <SelectItem
                                                            key={wallet.id}
                                                            value={wallet.id}
                                                        >
                                                            {wallet.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories
                                                        .filter(
                                                            (c) =>
                                                                c.type === type
                                                        )
                                                        .map((category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            {!hasCategories && (
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <p className="text-sm text-amber-600 flex items-center gap-1">
                                                        <AlertCircle className="h-4 w-4" />
                                                        No categories found for
                                                        this type.
                                                    </p>
                                                    <CreateCategoryDialog
                                                        type={type}
                                                    />
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isLoading || !canSubmit}
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {type === "TRANSFER"
                                    ? "Transfer"
                                    : "Add Transaction"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
