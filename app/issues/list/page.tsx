import { IssueStatusBadge, Link } from '@/app/components'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import IssueAction from './IssueAction'

interface Props {
  searchParams: { status: Status }
}

const IssuePage = async ({ searchParams }: Props) => {
  //console.log(searchParams.status)

  const statuses = Object.values(Status) // set statuses array - ["OPEN" | "IN_PROGRESS" | "CLOSED"]
  // console.log(statuses)
  // validation: statuses includes status then search params, or not including then undefined -> all data find and load 
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // When status undefined loading all data
  const issues = await prisma.issue.findMany({
    where: { status },
  })

  // Delay - simulate the slow server - test loading skeleton
  //await delay(2000)

  return (
    <div className='text-black'>
      <IssueAction /> {/* Buttom component - New Issue */}
      {/* Radix UI - Table element */}
      <Table.Root variant='surface'>
        {/* Radix UI - Add Table Header element */}
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {/* Radix UI - Add Table Body element */}
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.title}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} /> {/* Add Badge component - IssueStatusBadge.tsx */}
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} /> {/* Add Badge component - IssueStatusBadge.tsx */}
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = "force-dynamic" // manual refresh the page -> the page data refresh. Server side caching refresh

//export const revalidate = 30 // Example: Every 30 seconds refresh the page. Server side caching refresh.

export default IssuePage