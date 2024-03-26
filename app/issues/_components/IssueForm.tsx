'use client'

import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

/* Call dynamic function and import 'react-simplemde-editor' and set ssr false. SimpleMDE brovser api, can't run on server */
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
)

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema),
    });

    const [error, setError] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmiting(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
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
                <Button className='cursor-pointer' disabled={isSubmiting}>Submit New Issue {isSubmiting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm