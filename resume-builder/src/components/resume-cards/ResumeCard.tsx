"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, MoreVertical, Trash2, X, } from "lucide-react";

import { deleteResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteResume } from "@/redux/slices/resumeSlice";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
}

export default function ResumeCard({ id, title, updatedAt, }: ResumeCardProps) {

  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteResumeApi(id);

      if (response.success) {
        dispatch(deleteResume(id));
        setIsDeleteModalOpen(false);
      }

    } catch (error) {
      console.log("Error deleting resume:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Resume Card */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

        {/* Card Header */}
        <div className="mb-5 flex items-start justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={24} />
          </div>

          {/* More Button */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <MoreVertical size={20} />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteModalOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete Resume
                </button>

              </div>
            )}

          </div>

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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Delete Resume?
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-700">
                    {title || "Untitled Resume"}
                  </span>
                  ? This action cannot be undone.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isDeleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}