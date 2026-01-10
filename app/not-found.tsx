import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <h1 className="text-7xl font-bold text-foreground">404</h1>

            <p className="mt-4 text-lg text-muted-foreground">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
