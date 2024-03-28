'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

  /* Create navigation router */
  const router = useRouter()

  return (
    <AlertDialog.Root>
      {/* Alert dialog box triggerer - button (yet Delete Issue) */}
      <AlertDialog.Trigger>
        <Button color='red'>
          Delete Issue
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        {/* Alert dialog box "title" and "description" */}
        <AlertDialog.Title>
          Confirm Deletion
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action is permanent and
          cannot be undone.
        </AlertDialog.Description>
        {/* Alert dialog box have two button - cancel and action button */}
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant='solid' color='red' onClick={async () => {
              /* Add axios delete method, /api/issues/[id] - DELETE function in route */
              await axios.delete(`/api/issues/${issueId}`)
              /* Push the page on issues page */
              router.push('/issues')
              /* Refresh the issues page data, visibility the delete is done */
              router.refresh()
            }}>Delete</Button>
          </AlertDialog.Action>
        </Flex>

      </AlertDialog.Content>

    </AlertDialog.Root>
  )
}

export default DeleteIssueButton