import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { Link, IssueStatusBadge } from '@/app/components'
import React from 'react'
import delay from 'delay'
import IssueAction from './IssueAction'

const IssuePage = async () => {

  const issues = await prisma.issue.findMany()

  // Delay - simulate the slow server - test loading skeleton
  await delay(2000)

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