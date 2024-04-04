import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string,
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[],
}

const IssueTable = ({ searchParams, issues }: Props) => {

    return (
        /* Radix UI - Table element */
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
    )
}

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

export const columnNames = columns.map(column => column.value)

export default IssueTable