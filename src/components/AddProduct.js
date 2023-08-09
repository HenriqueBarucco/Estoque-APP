import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AddProduct = ({ setProductUpdated }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [measure, setMeasure] = useState("");
    const [available, setAvailable] = useState(0);
    const [price, setPrice] = useState(0);

    const handleClose = () => {
        setShow(false);
        setName("");
        setModel("");
        setMeasure("");
        setAvailable(0);
        setPrice(0);
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `https://estoque-api.henriquebarucco.com.br/products`,
                {
                    name,
                    model,
                    measure,
                    available,
                    price,
                }
            );
            console.log(response.data);
            setProductUpdated(true);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                Adicionar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome do produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formModel">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Modelo do produto"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMeasure">
                            <Form.Label>Medida</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tamanho do produto"
                                value={measure}
                                onChange={(e) => setMeasure(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAvailable">
                            <Form.Label>Disponível</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Quantidade em estoque"
                                value={available}
                                onChange={(e) => setAvailable(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Preço do produto"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddProduct;
