'use client'

import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { title } from 'process';
import { string } from 'zod';
import { useRouter } from 'next/navigation';

interface Issue {
  title: string;
  description: string;
}

const newIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<Issue>();

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit( async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
      />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default newIssuePage