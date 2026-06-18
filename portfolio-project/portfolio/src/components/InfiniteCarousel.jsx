import { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 250;
const CARD_H = 310;
const SCALE = 1.25;
const CARD_GAP = 20;
const DURATION = 25;
const TRACK_H = CARD_H * SCALE

const InfiniteCarousel = ({ projects }) => {
    const trackRef = useRef(null)
    const tweenRef = useRef(null)

    useEffect(() => {
        const singleWidth = projects.length * (CARD_W + CARD_GAP)
        console.log(singleWidth)
        tweenRef.current = gsap.to(trackRef.current, {
            x: -singleWidth,
            ease: "none",
            duration: DURATION,
            repeat: -1
        })

        return () => tweenRef.current?.kill()

    }, [projects])

    const double = [...projects, ...projects];

    return (
        <div
            style={{
                padding: `${TRACK_H * 0.5}px 0 24px`
            }}
            className="overflow-hidden "
        >
            <div ref={trackRef} style={{gap: `${CARD_GAP}px`, width: 'max-content', height: `${TRACK_H}px`}} className="track flex items-center">
                {double.map((project, i) => (
                    <CarouselCard key={i} project={project} onHoverStart={() => tweenRef.current?.pause()} onHoverEnd={() => tweenRef.current?.play()} />
                ))}
            </div>
        </div>
    )
}

export default InfiniteCarousel