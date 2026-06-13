"use client";

import { useAppSelector } from "@/hooks/useAppSelector";

export default function Navbar() {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  return (
    <nav className="border-b p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        ATS Resume Builder
      </h1>

      <div>
        {user?.name}
      </div>
    </nav>
  );
}