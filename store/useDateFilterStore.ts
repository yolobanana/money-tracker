import { create } from "zustand";

interface DateFilterState {
    month: number;
    year: number;
    setMonthYear: (month: number, year: number) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => {
    const now = new Date();
    return {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        setMonthYear: (month, year) => set({ month, year }),
    };
});
