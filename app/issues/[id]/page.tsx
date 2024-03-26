import { IssueStatusBadge } from '@/app/components/'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        notFound() // Never use "return" before the function. not found function, 404 This page could not be found. Auto generated page, when the id is not found
    }

    // Delay - simulate the slow server - test loading skeleton
    await delay(2000)

    return (
        <div>
            <Heading as='h1'>{issue.title}</Heading>
            <Flex className='gap-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' my="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage