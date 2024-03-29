/* Create Select content element - From many users select one user. */
'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AssigneeSelect = async () => {
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


    return (
        <Select.Root>{/* Select element - Radix-UI */}
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Separator />
                    {/* Call all users in (help useState and useEffect) */}
                    {users.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect