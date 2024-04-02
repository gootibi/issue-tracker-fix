/* This is the Select Status component */
'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

/* Set status value - The value is optional */
const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {

    const route = useRouter()

    return (
        /* Select Radix-UI element - Select hier the status - all, open, in progress, closed */
        <Select.Root onValueChange={(status) => { // in onValueChange push the selected value to the route
            const query = status === 'ALL' ? '' : `?status=${status}`
            route.push(`/issues/list` + query)
        }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.label} value={status.value ?? 'ALL'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter