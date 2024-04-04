import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  /* Count the data and save in const */
  const open = await prisma.issue.count({
    where: { status: 'OPEN' }
  })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' }
  })
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' }
  })

  return (
    <Flex direction='column' gap='4'>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  )
}
