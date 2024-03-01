'use client'

import { Button,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
// import { useRouter } from 'next/router';

interface IssueForm{
    authorId: Number
    title: string
    description: string
    status: string
}

const NewIssuePage = () => {
  // const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data)=> {
      await axios.post('/api/issues', data)
      // console.log(data)
      // router.push('/issues')
    })}>
      <input type='number' value="1" hidden {...register('authorId', { valueAsNumber: true })}/>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({field})=><SimpleMDE placeholder='Description' {...field}/>}
        />
        
        <TextField.Root>
            <TextField.Input placeholder='Status' {...register('status')}/>
        </TextField.Root>
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage