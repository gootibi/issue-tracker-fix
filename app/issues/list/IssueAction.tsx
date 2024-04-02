import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

// Add "New Issue" button component
const IssueAction = () => {
    return (
        <Flex mb='5' justify='between'>
            {/* Set the select status component */}
            <IssueStatusFilter />
            {/* Set the new Issue button */}
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </Flex>
    )
}

export default IssueAction