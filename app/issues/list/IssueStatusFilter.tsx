/* This is the Select Status component */
'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

/* Set status value - The value is optional */
const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {

    const route = useRouter()
    // useSearchPrams this hook access the current query parameters
    const searchParams = useSearchParams()

    return (
        /* Select Radix-UI element - Select hier the status - all, open, in progress, closed */
        <Select.Root
            defaultValue={searchParams.get('status') ?? 'ALL'} // get the status for query parameters
            onValueChange={(status) => { // in onValueChange push the selected value to the route

                // The URLSearchParams interface defines utility methods to work with the query string of a URL.
                // The URLSearchParams() constructor creates and returns a new URLSearchParams object.
                const params = new URLSearchParams();

                if (status !== 'ALL') {
                    // The append() method of the URLSearchParams interface appends a specified key/value pair as a new search parameter.
                    params.append('status', status);
                }

                // searchParams.get('orderBy') => get orderBy value from query string (Example: http://localhost:3000/issues/list?status=OPEN&orderBy=title)
                // searchParams.get('orderBy') => If the URL of your page is https://example.com/?name=Jonathan&age=18 you could parse out the 'name' and 'age' parameters using.
                if (searchParams.get('orderBy')) {
                    params.append('orderBy', searchParams.get('orderBy')!)
                }

                // Params size is truthy then return the qustion mark and a list of the parameters, otherwise return query empty string
                const query = params.size ? '?' + params.toString() : ''
                route.push(`/issues/list` + query)
            }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.label} value={status.value ?? 'ALL'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter