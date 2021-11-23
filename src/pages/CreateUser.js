import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function CreateUser() {

    const alert = useAlert();

    const [userTypes, setUserTypes] = useState([]);
    const [userCode, setUserCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        getUserTypes();
    }, []);

    function getUserTypes() {
        axios.get(`${APIURL}/userType`)
            .then(res => {
                setUserTypes(res.data);
            })
            .catch(err => {
                alert.error("INTERNAL SERVER ERROR - Try again later")
            });
    }

    function createNewUser() {
        const newUser = {
            userCode: userCode.toString().replaceAll(/\s/g,''),
            firstName,
            lastName,
            email,
            phone,
            borrowedBooks: 0,
            userType: {
                userTypeId: type
            }
        }

        axios.post(`${APIURL}/user`, newUser)
            .then(res => {
                alert.success("User created successfully");
                setUserCode('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
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
        <div className="createUser">
            <div className="maindiv">
                <h1>Create New User</h1>
                <Form style={{ fontSize: '20px' }}>
                    <Form.Group className="mb-3" controlId="formBasicUserCode">
                        <Form.Label>User Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter user code" value={userCode} onChange={e => setUserCode(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setType(e.target.value)}>
                            <option>Select user type</option>
                            {userTypes.map((type, index) => {
                                return (
                                    <option key={index} value={index + 1}>{`${index + 1} - ${type.userType}`}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" onClick={createNewUser}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
        </>
    )
}

export default CreateUser
