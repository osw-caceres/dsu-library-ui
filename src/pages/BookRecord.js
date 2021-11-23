import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, FormControl, Button, InputGroup } from 'react-bootstrap'
import dateFormat from "dateformat";
import APIURL from '../apiURL';

function BookRecord() {

    const [records, setRecords] = useState([]);
    const [searchBar, setSearchBar] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        getRecords();
    }, []);

    function getRecords() {
        axios.get(`${APIURL}/bookRecord`)
            .then(res => {
                console.log(res.data);
                setRecords(res.data);
            })
            .catch(err => {
                alert.error("INTERNAL SERVER ERROR - Try again later")
            });
    }

    function recordsItem(record, index) {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.transaction}</td>
                <td>{`${dateFormat(new Date(record.tookOn), "mm/dd/yyyy")}`}</td>
                <td>{`${dateFormat(new Date(record.dueDate), "mm/dd/yyyy")}`}</td>
                <td>{record.isReturned ? `${dateFormat(new Date(record.returnOn), "mm/dd/yyyy")}` : "Not returned"}</td>
                <td>{record.renewalCont}</td>
                <td>{record.delayPenalization === null ? '--' : `$${record.delayPenalization.toFixed(2)}`}</td>
                <td>{record.bookIsbn}</td>
                <td>{record.userCode}</td>
            </tr>
        )
    }

    function listRecords() {
        if (search.length === 0) {
            return records.map((record, index) => {
                return recordsItem(record, index);
            });
        } else {
            return records.map((record, index) => {
                if(record.userCode.toString() === search){
                    return recordsItem(record, index);
                }
                return null;
            });
        }
    }

    return (
        <div className="records">
            <div className="maindiv">
                <h1>Book Records</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="User Code"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={searchBar}
                        onChange={e => setSearchBar(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => setSearch(searchBar)}>
                        Search
                    </Button>
                </InputGroup>
                <Table striped bordered hover style={{ fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction</th>
                            <th>Took Out</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Renewal Count</th>
                            <th>Delay</th>
                            <th>Book ISBN</th>
                            <th>User Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRecords()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BookRecord
