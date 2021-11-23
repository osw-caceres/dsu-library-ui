import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function CreateBook() {

    const alert = useAlert();

    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    function createNewBook() {
        const newBook = {
            isbn, 
            author,
            title,
            category,
            isAvailable: true
        }

        axios.post(`${APIURL}/book`, newBook)
            .then(res => {
                alert.success("Book created successfully");
                setIsbn('');
                setAuthor('');
                setTitle('');
                setCategory('');
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
        <div className="createBook">
            <div className="maindiv">
                <h1>Create New Book</h1>
                <Form style={{ fontSize: '20px' }}>
                    <Form.Group className="mb-3" controlId="formBasicISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" placeholder="Enter book ISBN" value={isbn} onChange={e => setIsbn(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter book title" value={title} onChange={e => setTitle(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter book author" value={author} onChange={e => setAuthor(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter book category" value={category} onChange={e => setCategory(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" onClick={createNewBook}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateBook
