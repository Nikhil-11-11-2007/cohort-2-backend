"use client"

import gsap, { useGSAP } from "@/libs/gsap"
import TextReveal from "./TextReveal"
import { useRef } from "react"


const ProjectPage = ({ project }) => {

    const containerRef = useRef(null)
    const imageRef = useRef(null)

    useGSAP(() => {

        gsap.to(imageRef.current, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.3,
            ease: "expo.out",
            scale: 1,
            delay: 0.65
        })

    }, { scope: containerRef })

    return (
        <>
            <main ref={containerRef}>
                <section className="h-screen w-full pt-[5rem] pb-[2.5rem] px-[2rem] flex">
                    <div className="firstSegment h-full w-[12%]">
                        <TextReveal>
                            <h3 className="text-[1.3rem]">{project.number}</h3>
                        </TextReveal>
                    </div>
                    <div className="secondSegment h-[90%] w-[26%] ">
                        <div className="imageDiv overflow-hidden h-full w-full">
                            <img
                                ref={imageRef}
                                style={{ clipPath: "inset(100% 0 0 0)" }}
                                className="h-full scale-[1.4] w-full object-cover"
                                src={project.coverImage}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="thirdSegment pl-[4rem] h-[90%] w-[62%] flex flex-col justify-end">
                        <div className="heaading">
                            <TextReveal delay="0.6" ease="power$.out" stagger="0.03" splitBy="chars">
                                <h1 className="text-[2.4rem] leading-[1]">{project.title}</h1>
                            </TextReveal>
                        </div>
                        <div className="subHeaading flex gap-[1.5rem]">
                            <TextReveal delay="0.6" splitBy="words">
                                <h1 className="text-[1.5rem]">{project.subtitle}</h1>
                            </TextReveal>
                            <TextReveal delay="0.6" splitBy="chars">
                                <h1 className="text-[1.5rem]">{project.year}</h1>
                            </TextReveal>
                        </div>
                        <div className="description mt-[1rem] w-[60%] text-balance ">
                            <TextReveal delay="0.6" splitBy="lines">
                                <p className="text-[1rem] leading-[1.2]">{project.description}</p>
                            </TextReveal>
                        </div>
                    </div>
                </section>
                <section></section>
                <section></section>
                <section></section>
                <section></section>
                <footer></footer>
            </main>
        </>
    )
}

export default ProjectPage
