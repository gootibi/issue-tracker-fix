'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

  /* Create navigation router */
  const router = useRouter()

  /* Set the error state variable true, when the deleting is not working */
  const [error, setError] = useState(false)

  /* Delete issue async onclick function - a have try and catch */
  const deleteIssue = async () => {
    try {
      //throw new Error() -- Error Alert Dialog test row
      /* Add axios delete method, /api/issues/[id] - DELETE function in route */
      await axios.delete(`/api/issues/${issueId}`)
      /* Push the page on issues page */
      router.push('/issues')
      /* Refresh the issues page data, visibility the delete is done */
      router.refresh()
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
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
              <Button variant='solid' color='red' onClick={deleteIssue}>Delete</Button>
            </AlertDialog.Action>
          </Flex>

        </AlertDialog.Content>

      </AlertDialog.Root>

      {/* Error alert dialog - is visible when the delete is not work */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          {/* Alert dialog box "title", "description" and "ok" button */}
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted!</AlertDialog.Description>
          <Flex justify="end">
            {/* onclick event - setError useStete is false */}
            <Button variant="soft" color='gray' mt="2" onClick={() => setError(false)}>Ok</Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton