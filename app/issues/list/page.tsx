import { IssueStatusBadge, Link } from '@/app/components'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import IssueAction from './IssueAction'

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue }
}

const IssuePage = async ({ searchParams }: Props) => {
  //console.log(searchParams.status)

  /* Set the Column Header Cell label and value and className (optional) in array - dynamic render */
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

  const statuses = Object.values(Status) // set statuses array - ["OPEN" | "IN_PROGRESS" | "CLOSED"]
  // console.log(statuses)
  // validation: statuses includes status then search params, or not including then undefined -> all data find and load 
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // Validation and set the orderBy property, when searchParams.orderBy includes columns array values set { [searchParams.orderBy]: 'asc' } or not -> undefined
  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  // When status undefined loading all data, and add the orderBy property
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy
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
            {/* Dynamic render the label and value in Header Cell */}
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                {/* Set the order by in top of table, and add the icon on selected header element */}
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
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