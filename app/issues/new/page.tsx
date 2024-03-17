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

type IssueForm = z.infer<typeof createIssueSchema>

const newIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState('')

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
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occured.')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        {errors.title && <Text as='p' color='red'>{errors.title.message}</Text>}
        {/* {errors.title &&
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>
              {errors.title.message}
            </Callout.Text>
          </Callout.Root>
        } */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>}
        {/* {errors.description &&
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>
              {errors.description.message}
            </Callout.Text>
          </Callout.Root>
        } */}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default newIssuePage