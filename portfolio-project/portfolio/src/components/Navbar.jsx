import TextReveal from "./TextReveal"


const Navbar = () => {
    return (
        <div className="fixed z-[30] top-0 left-0 h-[7vh] flex items-center justify-between px-[2rem] py-[1.5rem] w-full bg-red-300 ">
            <div className="leftNameSide">
                <TextReveal>
                    <h3 className="text-[1.15rem] uppercase">Nikhil Gupta</h3>
                </TextReveal>
            </div>
            <div className="rightNameSide flex gap-[1.2rem] ">
                <TextReveal>
                    <h3 >Home</h3>
                </TextReveal>
                <TextReveal>
                    <h3 >About</h3>
                </TextReveal>
                <TextReveal>
                    <h3 >Contact</h3>
                </TextReveal>
            </div>
        </div>
    )
}

export default Navbar
