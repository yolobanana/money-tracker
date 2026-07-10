import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { AuthDialog } from "@/components/landing/AuthDialog";
import { Reveal } from "@/components/landing/Reveal";
import {
    ArrowRight,
    BarChart3,
    CalendarRange,
    Check,
    DollarSign,
    FolderTree,
    Moon,
    PieChart,
    Receipt,
    ShieldCheck,
    Sparkles,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";

const features = [
    {
        icon: Wallet,
        title: "Multiple wallets",
        description:
            "Track cash, bank accounts and e-wallets side by side, and move money between them with transfers.",
    },
    {
        icon: FolderTree,
        title: "Nested categories",
        description:
            "Organize spending with income and expense categories — including parent and child groupings.",
    },
    {
        icon: Receipt,
        title: "Fast transactions",
        description:
            "Log income, expenses and transfers in seconds with a clean, keyboard-friendly form.",
    },
    {
        icon: BarChart3,
        title: "Visual analytics",
        description:
            "Income vs. expense breakdowns and daily trend charts show exactly where your money goes.",
    },
    {
        icon: CalendarRange,
        title: "Month filtering",
        description:
            "Jump between months to review past spending and compare how your habits change over time.",
    },
    {
        icon: Moon,
        title: "Light & dark mode",
        description:
            "A polished interface that looks great day or night and adapts to your system theme.",
    },
];

const steps = [
    {
        title: "Create your account",
        description:
            "Sign up in seconds with email or Google — no credit card, no setup fees.",
    },
    {
        title: "Add wallets & categories",
        description:
            "Set up the accounts and spending buckets that match how you actually manage money.",
    },
    {
        title: "Track & understand",
        description:
            "Log transactions and watch the charts reveal your real financial picture.",
    },
];

export function LandingPage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
            {/* Animated background blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl dark:bg-emerald-500/20" />
                <div
                    className="animate-blob absolute top-32 -right-24 h-96 w-96 rounded-full bg-teal-400/25 blur-3xl dark:bg-teal-500/15"
                    style={{ animationDelay: "3s" }}
                />
                <div
                    className="animate-blob absolute top-[38rem] left-1/3 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl dark:bg-emerald-400/10"
                    style={{ animationDelay: "6s" }}
                />
            </div>

            {/* Nav */}
            <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                        <DollarSign className="size-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Money Tracker
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <AuthDialog
                        defaultMode="login"
                        trigger={
                            <Button variant="ghost" className="font-medium">
                                Log in
                            </Button>
                        }
                    />
                    <AuthDialog
                        defaultMode="register"
                        trigger={
                            <Button className="hidden bg-gradient-to-br from-emerald-500 to-teal-600 font-medium text-white shadow-lg shadow-emerald-500/30 hover:opacity-95 sm:inline-flex">
                                Get started
                            </Button>
                        }
                    />
                </div>
            </header>

            {/* Hero */}
            <section className="relative z-10 mx-auto max-w-6xl px-5 pt-12 pb-20 sm:px-8 sm:pt-20">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            <Sparkles className="size-4" />
                            Take control of your money
                        </div>
                        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                            Every rupiah,{" "}
                            <span className="animate-gradient bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                                beautifully tracked
                            </span>
                        </h1>
                        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                            Money Tracker brings your wallets, categories and
                            spending into one clean dashboard — with charts that
                            make your finances finally make sense.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <AuthDialog
                                defaultMode="register"
                                trigger={
                                    <Button
                                        size="lg"
                                        className="group bg-gradient-to-br from-emerald-500 to-teal-600 text-base font-semibold text-white shadow-xl shadow-emerald-500/30 hover:opacity-95"
                                    >
                                        Get started free
                                        <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                }
                            />
                            <AuthDialog
                                defaultMode="login"
                                trigger={
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="text-base font-semibold"
                                    >
                                        Log in
                                    </Button>
                                }
                            />
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Check className="size-4 text-emerald-500" />
                                Free to use
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="size-4 text-emerald-500" />
                                No credit card
                            </span>
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="size-4 text-emerald-500" />
                                Private & secure
                            </span>
                        </div>
                    </div>

                    {/* Floating product mockup */}
                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <DashboardMockup />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Everything you need to manage your money
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Powerful features wrapped in an interface that stays out
                        of your way.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <Reveal
                            key={feature.title}
                            delay={(i % 3) * 90}
                            className="group h-full rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10"
                        >
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-400">
                                <feature.icon className="size-6" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Get started in three steps
                    </h2>
                </Reveal>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <Reveal
                            key={step.title}
                            delay={i * 120}
                            className="relative rounded-2xl border bg-card/60 p-6 backdrop-blur"
                        >
                            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/30">
                                {i + 1}
                            </div>
                            <h3 className="text-lg font-semibold">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {step.description}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA band */}
            <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8">
                <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-14 text-center shadow-2xl shadow-emerald-500/30 sm:px-12">
                    <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to understand your money?
                    </h2>
                    <p className="relative mx-auto mt-3 max-w-md text-emerald-50">
                        Join now and turn scattered transactions into clear,
                        actionable insight.
                    </p>
                    <div className="relative mt-8 flex justify-center">
                        <AuthDialog
                            defaultMode="register"
                            trigger={
                                <Button
                                    size="lg"
                                    className="group bg-white text-base font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50"
                                >
                                    Get started free
                                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            }
                        />
                    </div>
                </Reveal>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                            <DollarSign className="size-4" />
                        </div>
                        <span className="font-semibold">Money Tracker</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Money Tracker. Built for
                        clarity.
                    </p>
                </div>
            </footer>

            <ModeToggle />
        </div>
    );
}

/** A stylized, static preview of the app dashboard used as the hero visual. */
function DashboardMockup() {
    const bars = [45, 70, 38, 88, 60, 95, 52];
    return (
        <div className="animate-float relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border bg-card/80 p-5 shadow-2xl shadow-emerald-500/10 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Net this month
                        </p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            Rp 8.607.000
                        </p>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <PieChart className="size-5" />
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border bg-background/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <TrendingUp className="size-3.5 text-emerald-500" />
                            Income
                        </div>
                        <p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            Rp 9.000.000
                        </p>
                    </div>
                    <div className="rounded-xl border bg-background/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <TrendingDown className="size-3.5 text-red-500" />
                            Expenses
                        </div>
                        <p className="mt-1 font-semibold text-red-600 dark:text-red-400">
                            Rp 393.000
                        </p>
                    </div>
                </div>

                <div className="flex h-28 items-end justify-between gap-2 rounded-xl border bg-background/60 p-3">
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            className="w-full rounded-t bg-gradient-to-t from-emerald-500 to-teal-400"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating chips */}
            <div
                className="animate-float absolute -top-5 -left-5 hidden rounded-xl border bg-card px-3 py-2 shadow-xl sm:block"
                style={{ animationDelay: "1.5s" }}
            >
                <div className="flex items-center gap-2">
                    <Wallet className="size-4 text-emerald-500" />
                    <span className="text-xs font-medium">Bank BCA</span>
                </div>
            </div>
            <div
                className="animate-float absolute -right-5 -bottom-5 hidden rounded-xl border bg-card px-3 py-2 shadow-xl sm:block"
                style={{ animationDelay: "2.5s" }}
            >
                <div className="flex items-center gap-2">
                    <Receipt className="size-4 text-teal-500" />
                    <span className="text-xs font-medium">+ Transaction</span>
                </div>
            </div>
        </div>
    );
}
