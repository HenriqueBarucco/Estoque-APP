import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const EditProduct = ({ product, setProductUpdated }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [available, setAvailable] = useState(product.available);
  const [price, setPrice] = useState(product.price);

  const handleClose = () => {
    setShow(false);
    setName(product.name);
    setDescription(product.description);
    setAvailable(product.setAvailable);
    setPrice(product.price);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://estoque-api.henriquebarucco.com.br/products/${product.id}`,
        {
          name,
          description,
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
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar produto - {product.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do produto"
                defaultValue={product.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição do produto"
                defaultValue={product.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAvailable">
              <Form.Label>Disponível</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantidade em estoque"
                defaultValue={product.available}
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preço do produto"
                defaultValue={product.price}
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

export default EditProduct;
