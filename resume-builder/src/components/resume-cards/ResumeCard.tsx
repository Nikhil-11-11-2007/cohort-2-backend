"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MoreVertical,
} from "lucide-react";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
}

export default function ResumeCard({
  id,
  title,
  updatedAt,
}: ResumeCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Card Header */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileText size={24} />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Resume Info */}
      <h3 className="truncate text-lg font-semibold text-gray-900">
        {title || "Untitled Resume"}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Updated {updatedAt}
      </p>

      {/* Edit Button */}
      <div className="mt-6">
        <Link
          href={`/resume/${id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
        >
          Edit Resume
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}