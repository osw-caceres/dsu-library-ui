import React from 'react'
import { Table, Button } from 'react-bootstrap'

function BookRecord() {
    return (
        <div className="records">
            <div className="maindiv">
                <h1>Book Records</h1>
                <Table striped bordered hover style={{ fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction</th>
                            <th>Took Out</th>
                            <th>Due Date</th>
                            <th>Returned</th>
                            <th>Renewal Count</th>
                            <th>Delay</th>
                            <th>Book ISBN</th>
                            <th>User Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>00001</td>
                            <td>MM/dd/YYYY</td>
                            <td>MM/dd/YYYY</td>
                            <td>MM/dd/YYYY</td>
                            <td>1</td>
                            <td>--</td>
                            <td>978-3-16-148410-0</td>
                            <td>00001</td>
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

export default BookRecord
