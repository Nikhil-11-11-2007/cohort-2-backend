import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="flex gap-6">
            <Link href={"/home"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact</Link>
        </div>
    )
}

export default Navbar
