'use client'
import { useUserContext } from "@/app/context/userContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { API_URL } from "@/lib/config"
import { infoToast, successToast } from "@/lib/toast"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export function TodoFormDialog() {
    const [isLoading,setIsLoading] = useState(false)
    const {userId} = useUserContext()
    const router = useRouter()
    const handleSubmit = async(event:React.FormEvent)=>{
        setIsLoading(true)
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const userData  = {
            text:formData.get("text"),
            isDone:false,
            userId:userId
        }
        await fetch('http://full-stack-next-js-todo-prisma.vercel.app/api/todo',{
          method:'POST',
          body:JSON.stringify(userData)
        }).then((res)=>{
          if(!res.ok){
            infoToast("Error try again")
            return
          }
          successToast("Created success")
          router.refresh()
        }).finally(()=>{
          setIsLoading(false)
        })   
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          userId&&
          <Button className="px-6">Create</Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="p-2 space-y-2">
          <DialogTitle className="text-xl">Mastering Productivity. A Journey to Achieve Your Goals</DialogTitle>
          <DialogDescription>
            Embark on a transformative journey to unlock your full potential and achieve unparalleled productivity. 💪🏆
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Label htmlFor="name">
              Todo
            </Label>
            <Input name="text"  className="col-span-3" />
            <Button className="" >{ isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span> : "Save"}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TodoFormDialog