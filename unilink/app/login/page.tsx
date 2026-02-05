"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOff = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // 🔐 auth logic later (Clerk / backend)
    router.push("/profile/create"); // ✅ REQUIRED REDIRECT
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900">
              <span className="text-base font-bold text-white">U</span>
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-neutral-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in to continue
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border px-4 py-3 pr-12 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* ✅ SIGN IN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-neutral-900 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
