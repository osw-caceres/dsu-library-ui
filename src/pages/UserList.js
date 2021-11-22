import React from 'react'
import { Table, Button } from 'react-bootstrap'

function UserList() {
    return (
        <div className="users">
            <div className="maindiv">
                <h1>User List</h1>  
                <Table striped bordered hover style={{ fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Code</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>00001</td>
                            <td>Otto</td>
                            <td>Rodriguez</td>
                            <td>email@url.com</td>
                            <td>123-456-789</td>
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

export default UserList
