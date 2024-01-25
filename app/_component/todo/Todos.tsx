import { Todo } from "@/app/api/todo/route"

import TodoTable from "./TodoTable"
import { API_URL } from "@/lib/config"
  
export interface TodoItem extends Todo {
    id:number,
    createdAt:Date
}

interface ResponseData {
    todos:TodoItem[],
}
const Todos = async()=>{ 

    const res = await fetch(API_URL+'/todo',{cache:"no-cache"})
    const {todos} : ResponseData  = await res.json()
        
    return(
        <TodoTable todos={todos} />
    )
}

export default Todos