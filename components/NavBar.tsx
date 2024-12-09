import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'

const NavBar = () => {
    return (
        <nav className="p-4 flex justify-between shadow-sm dark:shadow-primary">
            <Link href={'/'}>
                <h1 className="text-2xl font-bold">STRING GENIE</h1>
            </Link>
            <ModeToggle />
        </nav>
    )
}

export default NavBar