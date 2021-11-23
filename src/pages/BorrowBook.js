import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function BorrowBook() {

    const alert = useAlert();

    const [isbn, setIsbn] = useState('');
    const [userCode, setUserCode] = useState('');
    const [transaction, setTransaction] = useState('');

    function borrowBook() {

        const borrowData = {
            transaction,
            isReturned: false,
            renewalCont: 0,
            delayPenalization: 0
        }

        axios.post(`${APIURL}/bookRecord/${isbn}/${userCode}`, borrowData)
            .then(res => {
                alert.success("Book borrowed successfully");
                setIsbn('');
                setUserCode('');
                setTransaction('');
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
        <div className="borrow">
            <div className="maindiv">
                <h1>Borrow a Book</h1>
                <Form style={{ fontSize: '20px' }}>
                    <Form.Group className="mb-3" controlId="formBasicBookISBN">
                        <Form.Label>Transaction</Form.Label>
                        <Form.Control type="text" placeholder="Enter transaction number" value={transaction} onChange={e => setTransaction(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBookISBN">
                        <Form.Label>Book ISBN</Form.Label>
                        <Form.Control type="text" placeholder="Enter book ISBN" value={isbn} onChange={e => setIsbn(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserCode">
                        <Form.Label>User Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter user code" value={userCode} onChange={e => setUserCode(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={borrowBook}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default BorrowBook
