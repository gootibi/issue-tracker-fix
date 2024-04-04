import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueAction from './IssueAction'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'

interface Props {
  searchParams: IssueQuery
}

const IssuePage = async ({ searchParams }: Props) => {
  //console.log(searchParams.status)

  const statuses = Object.values(Status) // set statuses array - ["OPEN" | "IN_PROGRESS" | "CLOSED"]
  // console.log(statuses)
  // validation: statuses includes status then search params, or not including then undefined -> all data find and load 
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // Validation and set the orderBy property, when searchParams.orderBy includes columns array values set { [searchParams.orderBy]: 'asc' } or not -> undefined
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  // Set page value - search params or 1
  const page = parseInt(searchParams.page) || 1

  // Set page size - hardcoded page size
  const pageSize = 10

  // When status undefined loading all data, and add the orderBy property
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    /* Add skip and take https://www.prisma.io/docs/orm/prisma-client/queries/pagination */
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  // Set issues data count
  const issueCount = await prisma.issue.count({
    where: { status },
  })

  // Delay - simulate the slow server - test loading skeleton
  //await delay(2000)

  return (
    <Flex direction='column' gap='3' className='text-black'>
      <IssueAction /> {/* Buttom component - New Issue */}
      {/* Radix UI - Table element */}
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
    </Flex>
  )
}

export const dynamic = "force-dynamic" // manual refresh the page -> the page data refresh. Server side caching refresh

//export const revalidate = 30 // Example: Every 30 seconds refresh the page. Server side caching refresh.

export default IssuePage