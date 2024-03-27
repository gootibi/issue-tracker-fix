/* Create issue from skeleton (new and edit issue page loading style) */
import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueFromSkeleton = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
        </Box>
    )
}

export default IssueFromSkeleton