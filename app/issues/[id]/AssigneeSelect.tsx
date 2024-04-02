/* Create Select content element - From many users select one user. */
'use client'

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = async ({ issue }: { issue: Issue }) => {
    /* Use React Query - backend and client cache */
    const { data: users, error, isLoading } = useUsers()

    /* When 3 times the fetching not completed - then return null */
    if (error) {
        return null
    }

    /* When the fetching in progress - until then loading the Skeleton component */
    if (isLoading) {
        return <Skeleton />
    }

    const assignIssue = (userId: string) => {
        // Patch api/issues/[id] - set the issue assignedToUserId value to userId or null
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: userId === 'unassigned' ? null : userId
            })
            .catch(() => toast.error('Changes could not be saved')) // Set the error message in react-hot-toast
    }

    /*
    // Set users state
    const [users, setUsers] = useState<User[]>([])

    // useEffect - call the backend
    useEffect(() => {
        // fetch users (endpoint -> cretate /app/api/users/route.ts) - useEffect cannot be an async function, therefore create fetchUsers function -> it is can async function
        const fetchUsers = async () => {
            // axios GET request
            const { data } = await axios.get<User[]>('/api/users')
            // set the users state
            setUsers(data)
        }
        // Call fetchUsers function
        fetchUsers()
    }, [])
    */

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || 'unassigned'} // default value is 'unassigned' or selected user
                onValueChange={assignIssue}>{/* Select element - Radix-UI */}
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Separator />
                        {/* Set no user selection this row */}
                        <Select.Item value='unassigned'>Unassigned</Select.Item>
                        {/* Call all users in (help useState and useEffect) */}
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            {/* Put the Toaster component. It is visible, when the patch get error (backend error). It is visible top of center few seconds. */}
            <Toaster />
        </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data), // This is a query function - here add the fetch function
    staleTime: 60 * 1000, // 60 seconds automatical fetching from server
    retry: 3, // 3 times retry the fetching, when the fetching is fails
})

export default AssigneeSelect