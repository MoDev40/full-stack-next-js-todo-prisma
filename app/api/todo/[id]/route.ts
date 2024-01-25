import {NextRequest,NextResponse} from "next/server"
import prisma from "@/lib/client"
import {Todo} from "../route"

type Params = {
    id:string
}

export async function GET(req:NextRequest,{params}:{params:Params}){
    try {
        const todos = await prisma.todo.findMany({
            orderBy:{
                isDone:"desc"
            },
            where:{
                userId:Number(params.id)
            }
        })
        if(!todos){
            return NextResponse.json({message:"Todo not found"},{status:404})
        }
        return NextResponse.json({message:"Success",todos},{status:200})
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}

export async function PUT(req:NextRequest,{params}:{params:Params}){
    try {
        
        const {text,isDone,userId} : Todo = await req.json()
        
        const isTodoExists = await prisma.todo.findUnique({
            where:{
                id:Number(params.id)
            }
        })
        
        if(!isTodoExists){
            return NextResponse.json({message:"Todo not found"},{status:404})
        }
        
        const updatedTodo : Todo = await prisma.todo.update({
            data:{
                text:text,
                isDone:isDone,
            userId:userId
        },where:{
            id:Number(params.id)
        }
    })

    if(!updatedTodo){
        return NextResponse.json({message:"Tod not updated"},{status:400})
    }
    return NextResponse.json({updatedTodo,message:"Todo Updated Successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}

export async function DELETE(req:NextRequest,{params}:{params:Params}){
    try {
        
        const deletedTodo = await prisma.todo.delete({
            where:{
                id:Number(params.id)
            }
        })
        
        if(!deletedTodo){
            return NextResponse.json({message:"Tod not deleted"},{status:400})
        }
        return NextResponse.json({message:"Todo deleted Successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}