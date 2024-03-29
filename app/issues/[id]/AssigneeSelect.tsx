/* Create Select content element - From many users select one user. */
'use client'

import { Select } from '@radix-ui/themes'

const AssigneeSelect = async () => {

    return (
        <Select.Root>{/* Select element - Radix-UI */}
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Separator />
                    <Select.Item value='1'>Tibor Bálint</Select.Item>
                    <Select.Item value='2'>Szabolcs Bálint</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect