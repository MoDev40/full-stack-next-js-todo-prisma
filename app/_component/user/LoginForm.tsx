'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useUserContext } from '@/app/context/userContext'
import * as Cookies from "js-cookie"
import { infoToast, successToast } from '@/lib/toast'
import { API_URL } from '@/lib/config'

function LoginForm (){
    const [isLoading,setIsLoading] = useState(false)
    const {setUserId} = useUserContext()
    const router = useRouter()
    const handleSubmit = async(event:React.FormEvent)=>{
        setIsLoading(true)
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const userData  = {
            username:formData.get("username"),
            password:formData.get("password")
        }

        await fetch('https://full-stack-next-js-todo-prisma.vercel.app/api/user/login',{
            method:"POST",
            body:JSON.stringify(userData)
        }).then(async(res)=>{
            const data = await res.json()
                        
            if(!res.ok){
                infoToast("Invalid credentials")
                return
            }
            const {token,id} = data
            setUserId(id)
            Cookies.default.set("token",token)
            successToast("Login success")
            router.refresh()
            router.push("/")
        }).finally(()=>{
            setIsLoading(false)
        })

    }
    return(
    <div className='max-w-xl mx-auto p-10'>
        <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
            <form  onSubmit={handleSubmit} action=""  className='space-y-4 p-4'>
            <div>
            <Label>Username</Label>
            <Input required   placeholder="Enter username" name="username" type="text"/>
            </div>
            <div>
            <Label>Password</Label>
            <Input required   placeholder="Enter password " name="password" type="password"/>
            </div>
            <div className='cursor-pointer flex flex-col '>
            <Button>{ isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span> : "Login"}</Button>
            </div>
            </form>
        </CardContent>
    </Card>
    </div>
    )
}

export default LoginForm