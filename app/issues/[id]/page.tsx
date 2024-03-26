import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
                <IssueDetails issue={issue} /> {/* This row add issue data - from IssueDetails.tsx */}
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} /> {/* This row add "Edit issue" button - from EditIssueButton.tsx */}
            </Box>
        </Grid>
    )
}

export default IssueDetailPage