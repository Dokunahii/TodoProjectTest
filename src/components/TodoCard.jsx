import React, { useContext, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import TodoContext from '../contexts/TodoContext'
import DeleteModal from '../modals/DeleteModal'

export default function TodoCard({todo}) {
    const setTodos = useContext(TodoContext).setTodos

    
    var {id, title, description, completed, currentAccount, level} = todo
    
    const border = completed ? "success":"danger"
    const variant = !completed ? "success":"danger"
    const [show, setShow] = useState(false)

    const toggleCompleted = () => {
        completed = !completed
        setTodos((prevtodos) => { 
            return (
                prevtodos.map( (prevtodo) => {
                    if (id == prevtodo.id) {
                        return {id, title, description, completed, currentAccount, level}
                    } else {
                        return prevtodo
                    }
                })
            )
        })
    }

    const handleOpen = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const deleteTodo = () => {
        setTodos((prevtodos) => {
            return (
                prevtodos.filter((prevtodo) => {
                    return prevtodo.id !== id
                })
            )
        })
    }

  return (
        <>
            <Card border={border}>
                <Card.Header className='d-flex justify-content-between'>
                    {!completed && "Not"} Completed
                    <span><Button onClick={toggleCompleted} variant={variant}>{completed ? "Redo":"complete"}</Button></span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button href={`/edit/${id}`} variant='secondary'>
                        <i className='bi bi-pencil'></i>
                    </Button>
                    <Button onClick={handleOpen} variant='danger'>
                        <i className='bi bi-trash'></i>
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <p>V{level}</p>
                </Card.Footer>
            </Card>
            <DeleteModal show={show} onClick={deleteTodo} handleClose={handleClose} />
        
        </>
    )
}
