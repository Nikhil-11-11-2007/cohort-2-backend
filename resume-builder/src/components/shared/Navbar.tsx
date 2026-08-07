"use client";

import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function Navbar() {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  console.log(user)

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600"
      >
        ATS Resume Builder
      </Link>

      {/* Right Side */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">
            Hi, {user.name}
          </span>

          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}