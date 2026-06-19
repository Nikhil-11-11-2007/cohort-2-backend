"use client"

import InfiniteCarousel from "@/components/InfiniteCarousel";
import { projects } from "@/data/projects";

export default function Home() {

  return (
    <main className="bg-blue-500 flex items-start h-screen">
      <InfiniteCarousel projects={projects}/>
    </main>
  );
}
