import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { deleteProduct, getProducts, updateProduct } from '../redux/Actions/ProuductActions';

function ProductCard(props) {
    const dispatch=useDispatch()
    const [show, setShow] = useState(false);
    const [newPrice,setNewPrice]=useState(props.product.price)
    const handleDelete=()=>{
        dispatch(deleteProduct(props.product._id))
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = async() => {
      
      if (newPrice && newPrice !=props.product.price) {
        await dispatch(updateProduct(props.product._id, {price:newPrice}));
          handleClose();
      }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.product.imgURL} />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>
          {props.product.description}
        </Card.Text>
        <Card.Text>
          {props.product.price}
        </Card.Text>
        <Button variant="primary" onClick={handleDelete}>Delete</Button>
        <Button variant="primary" onClick={handleShow}>
        update price
      </Button>
      <Button variant="primary" style={{backgroundColor:props.product.dispo?"green":"red"}}>
            {props.product.dispo?"Disponible":"Indisponisble"}
          </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
      
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Price
        </InputGroup.Text>
        <Form.Control
        onChange={(e)=>setNewPrice(e.target.value)}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      

      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdate()}>
            update new Price
          </Button>
        </Modal.Footer>
      </Modal>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;