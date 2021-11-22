import React from 'react'
import { Form, Button } from 'react-bootstrap'

function ReturnBook() {
    return (
        <div className="return">
            <div className="maindiv">
                <h1>Return a Book</h1>
                <Form style={{ fontSize: '20px' }}>
                    <Form.Group className="mb-3" controlId="formBasicBookISBN">
                        <Form.Label>Book ISBN</Form.Label>
                        <Form.Control type="text" placeholder="Enter book ISBN" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserCode">
                        <Form.Label>User Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter user code" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ReturnBook
