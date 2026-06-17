"use client"

import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function Home() {

  const triggerRef = useRef(null)

  const handleHover = () => {

    triggerRef.current?.play()

  }

  const handleLeave = () => {
    triggerRef.current?.reverse()
  }

  return (
    <main className="bg-blue-950 h-[300vh]">
      <div onPointerEnter={handleHover} onPointerLeave={handleLeave} className="h-[15rem] w-[16rem] bg-red-400"></div>
      <TextReveal ref={triggerRef} splitBy="chars" trigger="manual" scrollStart="top 20%" className="text-9xl">
        Hello World
      </TextReveal>
    </main>
  );
}
