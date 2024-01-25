import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { TodoItem } from './Todos'
import { useRouter } from 'next/navigation'
import { infoToast, successToast } from '@/lib/toast'
import { API_URL } from '@/lib/config'

const DeleteTodo = ({todo}:{todo:TodoItem}) => {
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter()
    const handleSubmit = async(event:React.FormEvent)=>{
        setIsLoading(true)
        event.preventDefault()

        await fetch(API_URL+'/todo/'+todo.id,{
          method:'DELETE',
        }).then(async(res)=>{
          if(!res.ok){
            infoToast("Error deleting")
          }
          successToast("Deleted successfully")
          router.refresh()
        }).finally(()=>{
          setIsLoading(false)
        })
    }
    if(isLoading) return <Button className="w-8 h-8 rounded-full p-2" >{ isLoading&& <span className="h-4 w-4 border-t-2   border-b-2 border-white border-solid rounded-full animate-spin"></span>}</Button>

    return (
        <Button onClick={handleSubmit} className=" rounded-l-none rounded-r-md bg-red-400">Delete</Button> 
    )
}
export default DeleteTodo