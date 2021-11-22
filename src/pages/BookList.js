import React from 'react'
import { Table, Button } from 'react-bootstrap'

function BookList() {
    return (
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
                                <Button variant="primary" type="submit">
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
    )
}

export default BookList
