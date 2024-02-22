'use client'
import { useUserContext } from "@/app/context/userContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import React, {  useState } from "react"
import { TodoItem } from "./Todos"
import { infoToast, successToast } from "@/lib/toast"
import { Edit } from "lucide-react"

export function UpdateTodoDialog({todo}:{todo:TodoItem}) {
    const [isLoading,setIsLoading] = useState(false)
    const {userId} = useUserContext()
    const [userData,setUserData] = useState({text:todo.text,isDone:todo.isDone,userId:userId})

    const router = useRouter()
    const handleSubmit = async(event:React.FormEvent)=>{
        setIsLoading(true)
        event.preventDefault()

        await fetch('/api/todo/'+todo.id,{
          method:'PUT',
          body:JSON.stringify(userData)
        }).then((res)=>{
          if(!res.ok){
            infoToast("Error try again")
            return
          }
          successToast("Successfully updated")
          router.refresh()
        }).finally(()=>{
          setIsLoading(false)
        })
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-none bg-yellow-400"><Edit/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="p-2 space-y-2">
          <DialogTitle className="text-xl">Update</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Label htmlFor="name">
              Todo
            </Label>
            <Input name="text"  value={userData.text} onChange={(e)=> {setUserData({...userData,text:e.target.value})}} className="col-span-3" />
            <Button className="" >{ isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span> : "Save"}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTodoDialog