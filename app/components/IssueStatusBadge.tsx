import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

// Add status map and Record -> Record: give it key and value pairs
const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge