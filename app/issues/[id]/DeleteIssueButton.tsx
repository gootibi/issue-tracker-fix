'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
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
            <Button variant='solid' color='red'>Delete</Button>
          </AlertDialog.Action>
        </Flex>

      </AlertDialog.Content>

    </AlertDialog.Root>
  )
}

export default DeleteIssueButton