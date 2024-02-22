import { Todo } from "@/app/api/todo/route"
import React from 'react'
import TodoTable from "./TodoTable"
  
export interface TodoItem extends Todo {
    id:number,
    createdAt:Date
}

interface ResponseData {
  todos:TodoItem[];
}

const todosData : () => Promise<ResponseData> = async()=>{
  const res = await fetch('full-stack-next-js-todo-prisma.vercel.app/api/todo',{cache:"no-cache"})
  return await res.json()
}

const Todos = async() => {
  const {todos} = await todosData()
  console.log(todos);
  return (
    <TodoTable todos={todos}/>
  )
}

export default Todos