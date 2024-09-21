import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteModal({handleClose,show,onClick}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
            Delete Todo
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this todo?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onClick} variant='danger'>Delete</Button>
        </Modal.Footer>
    </Modal>
  )
}
