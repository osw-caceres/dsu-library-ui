import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function ReturnBook() {

    const alert = useAlert();

    const [isbn, setIsbn] = useState('');
    const [userCode, setUserCode] = useState('');
    const [transaction, setTransaction] = useState('');

    function returnBook() {
        axios.post(`${APIURL}/bookRecord/return/${transaction}/${isbn}/${userCode}`)
            .then(res => {
                alert.success("Book returned successfully");
                setIsbn('');
                setUserCode('');
                setTransaction('');
            })
            .catch(err => {
                if (err.response !== undefined) {
                    alert.error(`${err.response.status} - ${err.response.data.message}`);
                } else {
                    alert.error('Internal server error - Try again later')
                }
            });
    }

    return (
        <div className="return">
            <div className="maindiv">
                <h1>Return a Book</h1>
                <Form style={{ fontSize: '20px' }}>
                    <Form.Group className="mb-3" controlId="formBasicBookISBN">
                        <Form.Label>Transaction</Form.Label>
                        <Form.Control type="text" placeholder="Enter transaction number" value={transaction} onChange={e => setTransaction(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBookISBN">
                        <Form.Label>Book ISBN</Form.Label>
                        <Form.Control type="text" placeholder="Enter book ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserCode">
                        <Form.Label>User Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter user code" value={userCode} onChange={e => setUserCode(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={returnBook}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ReturnBook
