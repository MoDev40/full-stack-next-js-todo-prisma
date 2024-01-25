import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { TodoItem } from './Todos'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/lib/config'

const TodoStatus = ({todo}:{todo:TodoItem}) => {
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter()
    const handleSubmit = async(event:React.FormEvent)=>{
        setIsLoading(true)
        event.preventDefault()

        await fetch('https://full-stack-next-js-todo-prisma.vercel.app/api/todo/'+todo.id,{
          method:'PUT',
          body:JSON.stringify({text:todo.text,isDone:!todo.isDone,userId:todo.userId})
        }).then((res)=>{
          if(res.ok){
            router.refresh()
          }
        }).finally(()=>{
          setIsLoading(false)
        })
    }
    if(isLoading) return <Button className="w-8 h-8 rounded-full p-2" >{ isLoading && <span className="h-4 w-4 border-t-2   border-b-2 border-white border-solid rounded-full animate-spin"></span>}</Button>

    return (
    <Button onClick={handleSubmit} className="rounded-l-md rounded-r-none bg-green-400 ">{todo.isDone ? "Done" : "Undone"}</Button>
    )
}
export default TodoStatus