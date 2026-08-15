"use client";

interface ResumeBuilderProps {
  resumeId: string;
}

export default function ResumeBuilder({
  resumeId,
}: ResumeBuilderProps) {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold">
        Resume Builder
      </h1>

      <p className="mt-2 text-gray-600">
        Resume ID: {resumeId}
      </p>
    </main>
  );
}