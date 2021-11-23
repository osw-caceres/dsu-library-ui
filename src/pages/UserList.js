import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function UserList() {

    const alert = useAlert();

    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [userCode, setUserCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [borrowed, setBorrowed] = useState('');
    const [isUpdate, setIsUpdate] = useState(true);
    const [showEdit, setShowEdit] = useState(false);

    const switchEdit = () => setShowEdit(!showEdit);

    useEffect(() => {
        getUsers();
        getUserTypes();
    }, []);

    function getUsers() {
        axios.get(`${APIURL}/user`)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                alert.error("INTERNAL SERVER ERROR - Try again later")
            });
    }

    function getUserTypes() {
        axios.get(`${APIURL}/userType`)
            .then(res => {
                setUserTypes(res.data);
            })
            .catch(err => {
                alert.error("INTERNAL SERVER ERROR - Try again later")
            });
    }

    function openEdit(user) {
        setUserCode(user.userCode);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setType(user.userTypeId);
        setBorrowed(user.borrowedBooks);
        switchEdit();
    }

    function closeEdit() {
        setUserCode('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setType('');
        switchEdit();
    }

    function updateUser() {
        const updatedUser = {
            userCode,
            borrowedBooks: borrowed,
            firstName,
            lastName,
            email,
            phone,
            userType: {
                userTypeId: type
            }
        }

        axios.put(`${APIURL}/user/${userCode}`, updatedUser)
            .then(res => {
                alert.success("User updated successfully");
                getUsers();
                closeEdit();
            })
            .catch(err => {
                if(err.response !== undefined){
                    alert.error(`${err.response.status} - ${err.response.data.message}`);
                }else{
                    alert.error('Internal server error - Try again later')
                }
            });
    }

    function deleteUser() {
        axios.delete(`${APIURL}/user/${userCode}`)
            .then(res => {
                alert.success("User deleted successfully");
                getUsers();
                closeEdit();
            })
            .catch(err => {
                if(err.response !== undefined){
                    alert.error(`${err.response.status} - ${err.response.data.message}`);
                }else{
                    alert.error('Internal server error - Try again later')
                }
            });
    }

    return (
        <>
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
                                <th>Borrowed Books</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.userCode}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.borrowedBooks}</td>
                                        <td>
                                            <Button variant="primary" value={user} onClick={() => { setIsUpdate(true); openEdit(user) }}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" value={user} onClick={() => { setIsUpdate(false); openEdit(user) }}>
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
            <Modal show={showEdit} onHide={closeEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>{isUpdate ? 'Update User' : 'Delete User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ fontSize: '20px' }}>
                        <Form.Group className="mb-3" controlId="formBasicUserCode">
                            <Form.Label>User Code</Form.Label>
                            <Form.Control type="text" defaultValue={userCode} readOnly />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} readOnly={!isUpdate} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={lastName} onChange={e => setLastName(e.target.value)} readOnly={!isUpdate} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" defaultValue={email} onChange={e => setEmail(e.target.value)} readOnly={!isUpdate} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={phone} onChange={e => setPhone(e.target.value)} readOnly={!isUpdate} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>User Type</Form.Label>
                            <Form.Select aria-label="Default select example" defaultValue={type} onChange={e => setType(e.target.value)} disabled={!isUpdate}>
                                {userTypes.map((type, index) => {
                                    return (
                                        <option key={index} value={index + 1}>{`${index + 1} - ${type.userType}`}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>

                    {isUpdate ?
                        <Button variant="primary" onClick={updateUser}>
                            Save Changes
                        </Button>
                        :
                        <Button variant="danger" onClick={deleteUser}>
                            Delete
                        </Button>}

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserList
