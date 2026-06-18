"use client"

import InfiniteCarousel from "@/components/InfiniteCarousel";
import TextReveal from "@/components/TextReveal";
import { projects } from "@/data/projects";
import { useRef } from "react";

export default function Home() {

  return (
    <main className="bg-blue-950 flex items-start h-screen">
      <InfiniteCarousel projects={projects}/>
    </main>
  );
}
