import { NextResponse,NextRequest } from "next/server";
import { User } from "../signup/route";
import bcrypt from "bcrypt"
import prisma from "@/lib/client";
import jwt from 'jsonwebtoken'
import { sekret } from "@/lib/config";


export async function POST(req:NextRequest){
    try {
        
        const {username,password} : User = await req.json()
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
    
        if(!user){
            return NextResponse.json({ message:"invalid credentials"},{status: 404})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        
        if(!isPasswordCorrect){
            return NextResponse.json({message:"invalid credentials"},{status: 404})
        }
    
        const expiresIn : number = 1*24*60*60 
        const token : string = jwt.sign({id:user.id,expiresIn},sekret,{expiresIn})
        return NextResponse.json({ message:"Success", token,id:user.id},{status: 200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}