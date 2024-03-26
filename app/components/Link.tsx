/* Unique Link component with click the issue data, in table. */
import NextLink from "next/link" // import Link from "next/link" - rename
import { Link as RadixLink } from "@radix-ui/themes" // import { Link } from "@radix-ui/themes" - rename, help "as"

interface Props {
    href: string;
    children: string;
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    )
}

export default Link