import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { addProduct, getProducts } from '../redux/Actions/ProuductActions';

const ProductList = () => {
    const dispatch = useDispatch();
    const ListProduct = useSelector(state => state.ProductReducer.products);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imgURL, setImgURL] = useState("");

    const handleClick = () => {
        dispatch(addProduct({ id: Math.random(), name, description, price, imgURL }));
        handleClose();
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        dispatch(getProducts());
    },[])
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Product List</h1>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                Add New Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Name</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Price</InputGroup.Text>
                            <Form.Control
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter product price"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Image URL</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setImgURL(e.target.value)}
                                placeholder="Enter image URL"
                            />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClick}>
                        Register Product
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row xs={1} md={2} lg={3} className="g-4">
                {ListProduct?.map(product => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
