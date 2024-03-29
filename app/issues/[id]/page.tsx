import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const session = await getServerSession()

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        notFound() // Never use "return" before the function. not found function, 404 This page could not be found. Auto generated page, when the id is not found
    }

    // Delay - simulate the slow server - test loading skeleton
    await delay(2000)

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5"> {/* https://www.radix-ui.com/themes/docs/theme/breakpoints  initial (phone size 0px)-> 1 columns, md (tablet size 1024px) 2 columns*/}
            <Box className='md:col-span-4'> {/* Radiy-ui present sm (small devices) - this tailwind present md (medium device) ... divice size in teilwind and radix-ui two different screen size */}
                <IssueDetails issue={issue} /> {/* This row add issue data - from IssueDetails.tsx */}
            </Box>
            {session &&
                (<Box>
                    <Flex direction="column" gap="4">
                        <EditIssueButton issueId={issue.id} /> {/* This row add "Edit issue" button - from EditIssueButton.tsx */}
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>)}
        </Grid>
    )
}

export default IssueDetailPage