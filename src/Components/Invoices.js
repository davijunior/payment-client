import React from "react";
import { useState, useEffect } from "react";
import DateFormater from "./DateFormater";
import NewInvoice from "./NewInvoice";
import Accordion from 'react-bootstrap/Accordion';

import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Button } from "react-bootstrap";
import Auth from "./Auth";

function Invoices(props){
    const [invoices, setInvoices] = useState([]);
    const token = sessionStorage.getItem('token');
    useEffect(
        () => {
            fetchInvoices();
        },
        []
    )

    const deleteInvoices = (id) =>{
        try{
            fetch(`http://localhost:3000/invoices/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const data = invoices.filter(invoice => invoice.id !== id);
            setInvoices(data);
        }
        catch(error){
            console.log(error)
        }
    }

    const fetchInvoices = async () =>{
        try {
            const response = await fetch("http://localhost:3000/invoices", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const data = await response.json();
            setInvoices(data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const newInvoice = (invoice) => {
        setInvoices([invoice, ...invoices])
    }
    const is_authenticated = false; 
    return(
        <div>
            <Auth></Auth>
            <NewInvoice onCreate={newInvoice}></NewInvoice>
                {invoices.map(invoice => (
                    <Container>
                    <Accordion>
                        <Accordion.Item eventKey={invoice.id}>  
                            <Accordion.Header>
                                {invoice.name} - <DateFormater date={invoice.created_at} format='dd/MM/yyyy'></DateFormater>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Valor: {invoice.value}</ListGroup.Item>
                                    <ListGroup.Item>Número do cartão de crédito: {invoice.card_number}</ListGroup.Item>
                                    <ListGroup.Item>Validade: <DateFormater date={invoice.due_date} format='dd/MM/yyyy'></DateFormater></ListGroup.Item>
                                    <ListGroup.Item>CVV: {invoice.cvv}</ListGroup.Item>
                                </ListGroup>
                                <Button onClick={() => deleteInvoices(invoice.id)}>Excluir</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </Container>
                ))}
        </div>
    )
}

export default Invoices;