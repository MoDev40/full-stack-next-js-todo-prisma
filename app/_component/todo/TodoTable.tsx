'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { TodoItem } from './Todos'
import { useUserContext } from "@/app/context/userContext"
import UpdateTodoDialog from "./UpdateTodoDialog"
import TodoStatus from "./TodoStatus"
import DeleteTodo from "./DeleteTodo"

const TodoTable = ({todos}:{todos:TodoItem[]}) => {
    const  {userId} = useUserContext()
    return(
        userId ?
        <Table className="w-full">
        <TableCaption>A List Of Todos.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead ></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                todos&&
                todos.map((todo:TodoItem)=>(
                    todo.userId == userId&&
                    <TableRow key={todo.id}>
                            <TableCell className="w-[100px]">{todo.isDone? "Done" : "Pending"}</TableCell>
                            <TableCell>{todo.text}</TableCell>
                            <TableCell className="text-right items-center">
                                <TodoStatus todo={todo}/>
                                <UpdateTodoDialog todo={todo}/>
                                <DeleteTodo todo={todo}/>
                            </TableCell>
                        </TableRow>
                ))
            }
            </TableBody>
        </Table>
        :
        <div className="text-center">
            <p className="text-gray-500 capitalize">Signup / Login</p>
        </div>
    )
}

export default TodoTable