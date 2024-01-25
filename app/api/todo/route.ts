import {NextRequest,NextResponse} from "next/server"
import prisma from "@/prisma/client"


export interface Todo {
    text:string;
    isDone:boolean;
    userId:number
}


export async function GET(req:NextRequest){
    try {
        const todos = await prisma.todo.findMany({
            orderBy:{
                isDone:'asc'
            }
        })
        if(todos.length == 0){
            return NextResponse.json({message:"Todo Not found any thing"},{status:404})
        }
        return NextResponse.json({message:"Success",todos},{status:200})
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}

export async function POST(req:NextRequest){
    try {
        const {text,isDone,userId} : Todo = await req.json()
    
        const createdTodo : Todo = await prisma.todo.create({
            data:{
                text:text,
                isDone:isDone,
                userId:userId
            }
        })
        if(!createdTodo){
            return NextResponse.json({message:"Todo not created"},{status:400})
        }
        return NextResponse.json(createdTodo,{status:201})
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }

}



