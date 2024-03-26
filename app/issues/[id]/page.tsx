import { IssueStatusBadge } from '@/app/components/'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'
import Link from 'next/link'
import { Pencil2Icon } from '@radix-ui/react-icons'

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
        <Grid columns={{ initial: "1", md: "2" }} gap="5"> {/* https://www.radix-ui.com/themes/docs/theme/breakpoints  initial (phone size 0px)-> 1 columns, md (tablet size 1024px) 2 columns*/}
            <Box>
                <Heading as='h1'>{issue.title}</Heading>
                <Flex className='gap-3' my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' my="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage