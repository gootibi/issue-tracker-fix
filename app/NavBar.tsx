'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames'; // npm i classnames@2.3.2 - this give it strings that contains the classes we want to render, when the condition is tru that give it the string, help selecting navbar buttons styling.
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai"; // https://react-icons.github.io/react-icons/   npm install react-icons@4.11.0
import { Spinner } from './components';

const NavBar = () => {
    /* Current path declaration, use 'use client' */
    const currentPath = usePathname()

    /* That gives you access to the logged in user's session data - status (login, loading, logout) - data (username, email ect.) */
    /* When use useSession, add the app <SessionProvider> */
    const { status, data: session } = useSession()

    /* Nav bar links */
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]

    return (
        <nav className='mb-5 px-5 py-3 border-b'>
            <Container>
                <Flex justify='between' gap="4" align="center">
                    <Flex align="center" gap="3">
                        {/* Logo element */}
                        <Link href='/'><AiFillBug className='text-black' /></Link>
                        {/* Nav bar element => Dashboard , Issue */}
                        <ul className='flex space-x-5'>
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link
                                        className={classNames({ // npm i classnames@2.3.2 - this give it strings that contains the classes we want to render, when the condition is tru that give it the string, help selecting navbar buttons styling.
                                            'text-zinc-900': link.href === currentPath,
                                            'text-zinc-500': link.href != currentPath,
                                            'hover:text-zinc-800 transition-colors': true,
                                        })}
                                        href={link.href}>{link.label}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </Flex>
                    {/* Adding the Login and Logout Links + Loading spinner */}
                    <Box>
                        {status === 'authenticated' && (
                            //<Link href='/api/auth/signout'>Log out</Link>
                            /* Add avatar dropdown menu image file - add menu item email, name and logout button content */
                            <DropdownMenu.Root>
                                {/* Add triger button -> yet avatar image */}
                                <DropdownMenu.Trigger>
                                    {/* Add avatar image */}
                                    <Avatar
                                        src={session.user!.image!}
                                        fallback='?'
                                        size='2'
                                        radius='full'
                                        className='cursor-pointer'
                                    />
                                </DropdownMenu.Trigger>
                                {/* Add menu content - email, name and logout button */}
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='2'>{session.user!.email}</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Label>
                                        <Text size='2'>{session.user!.name}</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item><Link href='/api/auth/signout'>Log out</Link></DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === 'unauthenticated' && (
                            <Link href='/api/auth/signin'>Signin</Link>
                        )}
                        {status === 'loading' && (
                            <Spinner />
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar