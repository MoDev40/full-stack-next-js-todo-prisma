'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const {userId,logOut,verifyAndSetUser} = useUserContext()
  const router = useRouter()
  const handleLogout = ()=>{
    logOut()
    verifyAndSetUser("")
    router.refresh()
  }
  return (
    <nav className="flex items-center justify-between p-4">
    <Link href="/" className="font-bold text-lg">Todo</Link>
    <div className="space-x-4">
      {
        userId?
        <Button onClick={handleLogout}>Logout</Button>
        :
        <>
        <Link href="/auth/register">Sign Up</Link>
        <Link href="/auth/login">Login</Link>
        </> 
      }
      <Link href="https://github.com/MoDev40" target='blank' className="font-bold text-lg">GitHub</Link>
    </div>
  </nav>  )
}

export default NavBar