import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TodoContext from '../contexts/TodoContext'
import TodoCard from './TodoCard'
import CurrentAccountContext from '../contexts/CurrentAccountContext'

function CreateCard({todos,userId}) {
    const navigate = useNavigate()

    const filteredTodos = todos.filter((prevtodo) => {return (prevtodo.currentAccount == userId)})

    const sortedTodos = filteredTodos.sort( (x, y) => {return (x.completed == y.completed) ? 0: (x.completed ? 1:-1)})
    
    if (userId == null) {
        return (
            <p>Please <span onClick={() => navigate("/")}><u>Log In</u></span></p>
        )
    } else {
        return (
            sortedTodos.map( (todo) => {
                return(<TodoCard todo={todo} key={todo.id}/>)
            })
        )
    }
}

export default function Home() {
    const todos = useContext(TodoContext).todos
    const userId = useContext(CurrentAccountContext).currentAccount

    return (
        <>
            <h1>Your Todos</h1>
            <CreateCard todos={todos} userId={userId} />
        </>
    )
}
