import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const EditProduct = ({ product, setProductUpdated }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(product.name);
  const [model, setModel] = useState(product.model);
  const [measure, setMeasure] = useState(product.measure);
  const [available, setAvailable] = useState(product.available);
  const [price, setPrice] = useState(product.price.toFixed(2));

  const handleClose = () => {
    setShow(false);
    setName(product.name);
    setModel(product.model);
    setMeasure(product.measure);
    setAvailable(product.setAvailable);
    setPrice(product.price.toFixed(2));
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      if (available == null) setAvailable(0);

      const response = await axios.put(
        `https://estoque-api.henriquebarucco.com.br/products/${product.id}`,
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
      <Button variant="outline-primary" onClick={handleShow}>
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
            <Form.Group controlId="formModel">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Modelo do produto"
                defaultValue={product.model}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMeasure">
              <Form.Label>Medida</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medida do produto"
                defaultValue={product.measure}
                value={measure}
                onChange={(e) => setMeasure(e.target.value)}
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
                min="0"
                step="any"
                placeholder="Preço do produto"
                defaultValue={product.price.toFixed(2)}
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
