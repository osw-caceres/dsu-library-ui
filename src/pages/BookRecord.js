import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import dateFormat from "dateformat";
import APIURL from '../apiURL';

function BookRecord() {

    const [records, setRecords] = useState([]);

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

    return (
        <div className="records">
            <div className="maindiv">
                <h1>Book Records</h1>
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
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record.transaction}</td>
                                    <td>{`${dateFormat(new Date(record.tookOn),"mm/dd/yyyy")}`}</td>
                                    <td>{`${dateFormat(new Date(record.dueDate),"mm/dd/yyyy")}`}</td>
                                    <td>{record.isReturned ? `${dateFormat(new Date(record.returnOn),"mm/dd/yyyy")}` : "Not returned"}</td>
                                    <td>{record.renewalCont}</td>
                                    <td>{record.delayPenalization}</td>
                                    <td>{record.bookIsbn}</td>
                                    <td>{record.userCode}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BookRecord
