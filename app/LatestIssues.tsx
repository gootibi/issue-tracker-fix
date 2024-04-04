import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'
import Link from 'next/link'

const LatestIssues = async () => {

    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' }, // Order by created at desc
        take: 5,
        include: { assignedToUser: true } // This technique is called eager loading, fetching the issues users they are assigned to.
    })

    return (
        <Card>
            <Heading size='4' mb='5'>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue) =>
                        <Table.Row key={issue.title}>
                            <Table.Cell >
                                <Flex justify='between'>
                                    {/* Set the leatest issues title and status badge */}
                                    <Flex direction='column' gap='2' align='start'>
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {/* Set the right side the user picture, check if assigned user truthy -> visible avatar */}
                                    {issue.assignedToUser && (
                                        <Avatar
                                            src={issue.assignedToUser.image!}
                                            fallback='?'
                                            size='2'
                                            radius='full'
                                        />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues