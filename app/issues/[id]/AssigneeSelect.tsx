/* Create Select content element - From many users select one user. */
'use client'

import { Skeleton } from '@/app/components'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AssigneeSelect = async () => {
    /* Use React Query - backend and client cache */
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data), // This is a query function - here add the fetch function
        staleTime: 60 * 1000, // 60 seconds automatical fetching from server
        retry: 3, // 3 times retry the fetching, when the fetching is fails
    })

    /* When 3 times the fetching not completed - then return null */
    if (error) {
        return null
    }

    /* When the fetching in progress - until then loading the Skeleton component */
    if (isLoading) {
        return <Skeleton />
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
        <Select.Root>{/* Select element - Radix-UI */}
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Separator />
                    {/* Call all users in (help useState and useEffect) */}
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect