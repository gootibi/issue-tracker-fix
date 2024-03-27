'use client'

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

/* Call dynamic function and import 'react-simplemde-editor' and set ssr false. SimpleMDE brovser api, can't run on server */
// const SimpleMDE = dynamic(
//     () => import('react-simplemde-editor'),
//     { ssr: false }
// )

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });

    const [error, setError] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmiting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data) // patch the issue data in to database
            } else {
                await axios.post('/api/issues', data); // create a new issue data in the database
            }
            router.push('/issues');
            router.refresh(); // refresh the issues page (data). Clients side ceche refresh the issue data.
        } catch (error) {
            setIsSubmiting(false)
            setError('An unexpected error occured.')
        }
    })

    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form
                className='space-y-3'
                onSubmit={onSubmit}
            >
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description} // If there is issue data, get the default value this issue data.
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button className='cursor-pointer' disabled={isSubmiting}>
                    {/* When issue is true (Edit page) visible 'Update Issue', not true (Create page) visible 'Submit New Issue' */}
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmiting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm