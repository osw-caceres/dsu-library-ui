import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import APIURL from '../apiURL';

function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get(`${APIURL}/user`)
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //TODO Add functionality to Actions buttons
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
                        {users.map((user, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{user.userCode}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Button variant="primary" type="submit">
                                            Edit
                                        </Button>
                                        <Button variant="danger" type="submit">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default UserList
