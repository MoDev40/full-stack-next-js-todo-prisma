import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/prisma/client";

export async function GET(req:NextRequest){
    return NextResponse.json("We are Here signup")
}

export interface User {
    username:string;
    password:string
}

export async function POST(req:NextRequest){
    try {
        const {username,password} : User = await req.json()
        const hashedPasword = await bcrypt.hash(password,10);
        const user : User = await prisma.user.create({
            data:{
                username:username,
                password:hashedPasword
            }
        })
        if(!user){
            return NextResponse.json({status: 404, message:"Something went wrong"})
        }
        return NextResponse.json({message:"Success",user,status:201})
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}