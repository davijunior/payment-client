import React from "react";
import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function NewInvoice({onCreate}) {
    const [name, setName] = React.useState("");
    const [card_number, setCardNumber] = React.useState("");
    const [due_date, setDueDate] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('token');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: name,
                card_number: card_number,
                due_date: due_date,
                cvv: cvv,
                value: amount
            }),
        }).then(res => res.json())
        .then(
            (result) => {
                if(result.success) {
                    alert("Transação cadastrada!");
                    setName("");
                    setCardNumber("");
                    setDueDate("");
                    setCvv("");
                    setAmount("");
                    handleClose();
                    onCreate(result.data);
                }else{
                    const errors = Object.values(result.errors)
                    alert(errors);
                    
                }
            },
            (error) => {
                console.error(error);
            }
        )
    }

    return(
        <div className="modal show" style={{ display: 'block', position: 'initial', padding: '5px' }} >
            <Button variant="primary" onClick={handleShow}>
                Cadastrar nova Transação
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Transação</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Numero do Cartão</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Numero do Cartão"
                                value={card_number}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Validade</Form.Label>
                            <Form.Control 
                                type="date"
                                placeholder="Date de validade"
                                value={due_date}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="Valor da transação"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default NewInvoice;