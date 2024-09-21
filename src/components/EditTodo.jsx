import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import TodoContext from "../contexts/TodoContext"
import { useNavigate, useParams } from "react-router-dom"
import CurrentAccountContext from "../contexts/CurrentAccountContext"

export default function EditTodo() {

    const id = parseInt(useParams().id)
    const todos = useContext(TodoContext).todos
    const setTodos = useContext(TodoContext).setTodos
    const currentTodo = todos.filter((todo) => todo.id == id)[0]
    const navigate = useNavigate()
    const [title, setTitle] = useState(currentTodo.title)
    const [description, setDescription] = useState(currentTodo.description)
    const completed = currentTodo.completed
    const currentAccount = useContext(CurrentAccountContext).currentAccount
    const [level, setLevel] = useState(null)

    const editTodo = () => {
        setTodos((prevTodos) => {
            return(
                prevTodos.map((prevtodo) => {
                    if (prevtodo.id == id) {
                        return {id, title, description, completed, currentAccount, level}
                    } else {
                        return prevtodo
                    }
                })
            )
        })
        navigate(`/home`)
    }

  return (
    <>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    as="textarea"
                    onChange={(e) => {setDescription(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Select onChange={(e) => {setLevel(e.target.value)}}>
                    <option value={1}>v1</option>
                    <option value={2}>v2</option>
                    <option value={3}>v3</option>
                    <option value={4}>v4</option>
                    <option value={5}>v5</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={editTodo}>Save Changes</Button>

        </Form>
    </>
  )
}