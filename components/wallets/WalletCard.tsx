"use client";

import { SerializedWallet } from "@/types/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { EditWalletDialog } from "./EditWalletDialog";
import { DeleteWalletDialog } from "./DeleteWalletDialog";

interface WalletCardProps {
    wallet: SerializedWallet;
}

export function WalletCard({ wallet }: WalletCardProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">
                        {wallet.name}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => setShowEditDialog(true)}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {Number(wallet.balance).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created on{" "}
                        {new Date(wallet.createdAt).toLocaleDateString()}
                    </p>
                </CardContent>
            </Card>

            <EditWalletDialog
                wallet={wallet}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
            />

            <DeleteWalletDialog
                id={wallet.id}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
        </>
    );
}
