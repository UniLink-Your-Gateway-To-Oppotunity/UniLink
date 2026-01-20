import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b">
            <div className="text-xl font-bold">Collab</div>

            <div className="flex gap-6 text-sm">
                <Link href="#features" className="text-gray-600 hover:text-black">
                    Features
                </Link>
                <Link href="/auth" className="font-medium">
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
