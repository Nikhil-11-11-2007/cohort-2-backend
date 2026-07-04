import Navbar from "@/components/shared/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <h1 className="mb-4 text-center text-5xl font-bold">
          Build ATS Friendly Resume
        </h1>

        <p className="max-w-2xl text-center text-lg text-gray-600">
          Create professional resumes in minutes with AI assistance,
          ATS optimization, and beautiful templates.
        </p>
      </main>
    </>
  );
}