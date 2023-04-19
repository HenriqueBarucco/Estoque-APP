import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SaleProduct = ({ product, setProductUpdated }) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(product.price);

  const handleClose = () => {
    setShow(false);
    setQuantity(0);
    setPrice(product.price);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://estoque-api.henriquebarucco.com.br/sales`,
        {
          productId: product.id,
          quantity: quantity,
          price: price,
          year: "2023",
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
      <Button
        variant="success"
        disabled={product.available <= 0}
        onClick={handleShow}
      >
        Vender
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vender produto - {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantidade para vender"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor unitário"
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
            Vender
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaleProduct;
