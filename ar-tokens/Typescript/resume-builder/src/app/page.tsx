import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-bold">
        ATS Resume Builder
      </h1>

      <Link
        href="/auth/login"
        className="bg-blue-600 px-5 py-3 rounded text-white"
      >
        Login
      </Link>

      <Link
        href="/auth/register"
        className="bg-green-600 px-5 py-3 rounded text-white"
      >
        Register
      </Link>
    </main>
  );
}