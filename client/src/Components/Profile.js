import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteUser, resetPasswordUser } from '../redux/Actions/UserActions';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bool, setbool] = useState(false);
  const [newpass, setNewpass] = useState("");

  const handlebool = () => {
    setbool(!bool);
  };

  const del = async () => {
    await dispatch(deleteUser(user._id));
    navigate("/");
  };

  const changePass = async () => {
      await dispatch(resetPasswordUser(user._id,newpass));
      setbool(false)
  };

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user])

  return (
    <div>
      <h1>Profile</h1>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user?.photo} />
        <Card.Body>
          <Card.Title>{user?.username}</Card.Title>
          <Card.Title>Email: {user?.email}</Card.Title>
          <Card.Text>Age: {user?.age}</Card.Text>
          <Card.Text>Phone: {user?.phone}</Card.Text>
          <Button variant="primary" onClick={del}>Delete</Button>
          <Button variant="primary" onClick={handlebool}>Modify Password</Button>
          {bool && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setNewpass(e.target.value)}
              />
              <Button variant="primary" onClick={changePass}>Send</Button>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
