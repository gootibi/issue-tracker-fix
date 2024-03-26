'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { title } from 'process';
import { string, z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import classNames from 'classnames';

type IssueForm = z.infer<typeof createIssueSchema>

const newIssuePage = () => {
  
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
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
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
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

export default newIssuePage