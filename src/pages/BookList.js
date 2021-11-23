import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import APIURL from '../apiURL';

function BookList() {

    const alert = useAlert();

    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [isUpdate, setIsUpdate] = useState(true);
    const [showEdit, setShowEdit] = useState(false);

    const switchEdit = () => setShowEdit(!showEdit);

    useEffect(() => {
        getBooks();
    }, []);

    function getBooks() {
        axios.get(`${APIURL}/book`)
            .then(res => {
                console.log(res.data);
                setBooks(res.data);
            })
            .catch(err => {
                alert.error("INTERNAL SERVER ERROR - Try again later")
            });
    }

    function openEdit(book) {
        setIsbn(book.isbn);
        setAuthor(book.author);
        setTitle(book.title);
        setCategory(book.category);
        setIsAvailable(book.isAvailable);
        switchEdit();
    }

    function closeEdit() {
        setIsbn('');
        setAuthor('');
        setTitle('');
        setCategory('');
        setIsAvailable(false);
        switchEdit();
    }

    function updateBook() {
        const updatedBook = {
            isbn,
            title,
            author,
            category,
            isAvailable
        }

        console.log(updatedBook);

        axios.put(`${APIURL}/book/${isbn}`, updatedBook)
            .then(res => {
                alert.success("Book updated successfully");
                getBooks();
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

    function deleteBook() {

    }

    return (
        <>
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
                            {books.map((book, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.isAvailable ? "Yes" : "No"}</td>
                                        <td>
                                            <Button variant="primary" value={book} onClick={() => { setIsUpdate(true); openEdit(book) }}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" value={book} onClick={() => { setIsUpdate(false); openEdit(book) }}>
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
                    <Modal.Title>{isUpdate ? 'Update Book' : 'Delete Book'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ fontSize: '20px' }}>
                        <Form.Group className="mb-3" controlId="formBasicISBN">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" placeholder="Enter book ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} readOnly />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter book title" value={title} onChange={e => setTitle(e.target.value)} readOnly={!isUpdate} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter book author" value={author} onChange={e => setAuthor(e.target.value)} readOnly={!isUpdate} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter book category" value={category} onChange={e => setCategory(e.target.value)} readOnly={!isUpdate} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Check type="checkbox" id={`default-checkbox`} label={`Available`} checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>

                    {isUpdate ?
                        <Button variant="primary" onClick={updateBook}>
                            Save Changes
                        </Button>
                        :
                        <Button variant="danger" onClick={deleteBook}>
                            Delete
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookList
