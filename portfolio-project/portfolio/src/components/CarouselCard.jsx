import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/libs/gsap";

const CARD_W = 250;
const CARD_H = 310;
const SCALE = 1.25

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const numberRef = useRef(null)
    const titleRef = useRef(null)

    const onEnter = () => {
        onHoverStart?.()

        gsap.to(cardRef.current, {
            width: CARD_W * SCALE,
            height: CARD_H * SCALE,
            duration: 0.35,
            ease: "power3.out"
        })

        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.38,
            ease: "power3.out"
        })

        numberRef.current?.play()
        titleRef.current?.play()
    }

    const onLeave = () => {
        onHoverEnd?.()

        gsap.to(cardRef.current, {
            width: CARD_W,
            height: CARD_H,
            duration: 0.16,
            ease: "power3.out"
        })

        gsap.to(imageRef.current, {
            scale: 1.6,
            duration: 0.19,
            ease: "power3.out"
        })

        numberRef.current?.reverse()
        titleRef.current?.reverse()
    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{ width: CARD_W, height: CARD_H, flexShrink: 0, overflow: "visible", cursor: "pointer" }}
            className="relative"
        >
            {/* title panel */}
            <div
                style={{ bottom: "calc(100% + 0.7rem)" }}
                className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-[0.3rem]"
            >
                <TextReveal ref={numberRef} duration="0.25" trigger="manual" splitBy="chars" >
                    <h3 className="text-[1rem] text-[#010101]">{project.number}</h3>
                </TextReveal>
                <TextReveal ref={titleRef} duration="0.25" trigger="manual" splitBy="words" >
                    <h3 className="text-[1rem] text-[#010101]">{project.title}</h3>
                </TextReveal>
            </div>

            <div className="imageDiv h-full w-full overflow-hidden ">
                <img
                    style={{ transformOrigin: "center center", userSelect: "none" }}
                    className="h-full scale-[1.6] w-full object-cover "
                    ref={imageRef}
                    src={project.coverImage}
                    alt={project.title}
                />
            </div>
        </div>
    )
}

export default CarouselCard
