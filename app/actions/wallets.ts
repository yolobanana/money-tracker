"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { createWalletSchema, CreateWalletInput, updateWalletSchema, UpdateWalletInput } from "@/schemas/wallet.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { SerializedWallet } from "@/types/wallet";

export async function getWallets(): Promise<SerializedWallet[]> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const wallets = await prisma.wallet.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return wallets.map(wallet => ({
      ...wallet,
      balance: wallet.balance.toNumber(),
  }));
}

export async function createWallet(data: CreateWalletInput) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { name, initialBalance } = createWalletSchema.parse(data);

  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      name,
      balance: initialBalance,
    },
  });

  revalidatePath("/wallets");
  return wallet;
}

export async function updateWallet(id: string, data: UpdateWalletInput) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const { name, balance } = updateWalletSchema.parse(data);

    const wallet = await prisma.wallet.update({
        where: {
            id,
            userId: user.id,
        },
        data: {
            name,
            balance,
        },
    });

    revalidatePath("/wallets");
    return wallet;
}



export async function deleteWallet(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  await prisma.wallet.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/wallets");
}

export async function getCategoryStats() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const stats = await prisma.transaction.groupBy({
        by: ["categoryId", "type"],
        where: {
            userId: user.id,
            type: "EXPENSE",
        },
        _sum: {
            amount: true,
        },
    });

    // We need to fetch category names
    const categories = await prisma.category.findMany({
        where: {
            id: {
                in: stats.map((s) => s.categoryId).filter((id): id is string => id !== null),
            },
        },
    });

    const data = stats.map((stat) => {
        const category = categories.find((c) => c.id === stat.categoryId);
        return {
            name: category?.name || "Uncategorized",
            value: stat._sum.amount?.toNumber() || 0,
            type: stat.type,
        };
    });

    // Sort by value desc
    return data.sort((a, b) => b.value - a.value);
}

export async function getWalletStats() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const stats = await prisma.transaction.groupBy({
        by: ["walletId", "type"],
        where: {
            userId: user.id,
            type: "EXPENSE",
        },
        _sum: {
            amount: true,
        },
    });

    const wallets = await prisma.wallet.findMany({
        where: {
            userId: user.id,
        },
    });

    const data = stats.map((stat) => {
        const wallet = wallets.find((w) => w.id === stat.walletId);
        return {
            name: wallet?.name || "Unknown Wallet",
            value: stat._sum.amount?.toNumber() || 0,
            type: stat.type,
        };
    });

    return data.sort((a, b) => b.value - a.value);
}
