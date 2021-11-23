import React, { useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'

function BookList() {

    const [showEdit, setShowEdit] = useState(false);

    const switchEdit = () => setShowEdit(!showEdit);

    return (
        <>
            <div className="books">
                <div className="maindiv">
                    <h1>Book List</h1>
                    <Table striped bordered hover style={{ fontSize: '20px' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ISBN</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Available</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>978-3-16-148410-0</td>
                                <td>Lord of the Rings</td>
                                <td>J. R. R. Tolkien</td>
                                <td>Fantasy</td>
                                <td>Yes</td>
                                <td>
                                    <Button variant="primary" onClick={switchEdit}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" type="submit">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={showEdit} onHide={switchEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={switchEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={switchEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookList
