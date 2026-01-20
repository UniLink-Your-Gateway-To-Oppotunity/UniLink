import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b">
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                    priority
                />
            </Link>

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
