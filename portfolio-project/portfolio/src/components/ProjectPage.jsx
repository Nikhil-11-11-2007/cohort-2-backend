"use client"

import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap"
import TextReveal from "./TextReveal"
import { useRef } from "react"
import useViewTransition from "@/hooks/useViewTransition"


const ProjectPage = ({ project, nextProject }) => {

    const containerRef = useRef(null)
    const imageRef = useRef(null)

    useGSAP(() => {

        const sections = gsap.utils.toArray("section");

        gsap.to(imageRef.current, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            ease: "expo.out",
            scale: 1,
            delay: 0.65
        })


        sections.forEach((section, idx) => {
            const container = section.children[0]

            gsap.to(container, {
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: true
                }
            });


            if (idx === sections.length - 1) return

            ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                pin: true,
                pinSpacing: false
            })

        })

    }, { scope: containerRef })

    const {navigateTo} = useViewTransition()

    const handleClick = () => {
        navigateTo(`/project/${nextProject.slug}`)
    }

    return (
        <>
            <main ref={containerRef}>
                <section className="h-screen w-full">
                    <div className="sectionContainer h-full w-full flex pt-[5rem] pb-[2.5rem] px-[2rem] ">
                        <div className="firstSegment h-full w-[12%]">
                            <TextReveal>
                                <h3 className="text-[1.3rem]">{project.number}</h3>
                            </TextReveal>
                        </div>
                        <div className="secondSegment h-[90%] w-[26%] ">
                            <div className="imageDiv overflow-hidden h-full w-full">
                                <img
                                    ref={imageRef}
                                    style={{ clipPath: "inset(0 0 100% 0)" }}
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
                    </div>
                </section>
                {project.gallery.map((elem, idx) => {
                    return (
                        <section key={idx} className="h-screen w-full ">
                            <div style={{ transformOrigin: "bottom left" }} className="sectionContainer rotate-[30deg] h-full w-full ">
                                <img className="h-full w-full object-cover " src={elem} alt="" />
                            </div>
                        </section>
                    )
                })}
                <footer className="h-screen w-full flex flex-col items-center justify-center ">
                    <h1>Next Project</h1>
                    <h1 className="text-3xl cursor-pointer" onClick={handleClick}>{nextProject.title}</h1>
                </footer>
            </main>
        </>
    )
}

export default ProjectPage
