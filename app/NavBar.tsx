'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai"; // https://react-icons.github.io/react-icons/   npm install react-icons@4.11.0
import classNames from 'classnames'; // npm i classnames@2.3.2

const NavBar = () => {
    /* Current path declaration, use 'use client' */
    const currentPath = usePathname()

    /* Nav bar links */
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]

    return (
        <nav className='flex mb-5 px-5 h-14 space-x-6 border-b items-center'>
            {/* Logo element */}
            <Link href='/'><AiFillBug className='text-black'/></Link>
            {/* Nav bar element => Dashboard , Issue */}
            <ul className='flex space-x-5'>
                {links.map(link =>
                    <li key={link.href}>
                        <Link
                            className={classNames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href != currentPath,
                                'hover:text-zinc-800 transition-colors': true,
                            })}
                            href={link.href}>{link.label}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar