import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import TodoContext from "../contexts/TodoContext"
import { useNavigate } from "react-router-dom"
import CurrentAccountContext from "../contexts/CurrentAccountContext"

export default function AddTodos() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const todos = useContext(TodoContext).todos
    const setTodos = useContext(TodoContext).setTodos
    const navigate = useNavigate()
    const currentAccount = useContext(CurrentAccountContext).currentAccount
    const [level, setLevel] = useState(1)

    const addTodo = () => {
        event.preventDefault()
        console.log(currentAccount)
        setTodos([...todos, {id: Date.now(), title, description, completed: false, currentAccount, level}])
        navigate(`/home`)
    }

  return (
    <>
        <Form onSubmit={addTodo}>
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
            <Button variant="primary" type="submit">Add</Button>

        </Form>
    </>
  )
}
