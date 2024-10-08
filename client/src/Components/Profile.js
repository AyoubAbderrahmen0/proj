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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleDelete = async () => {
    await dispatch(deleteUser(user._id));
    navigate("/");
  };

  const handleChangePassword = async () => {
    await dispatch(resetPasswordUser(user._id, newPassword));
    setShowPasswordForm(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Profile</h1>
      <Card className="mx-auto" style={{ width: '18rem' }}>
        {user?.photo && <Card.Img variant="top" src={user.photo} />}
        <Card.Body>
          <Card.Title>{user?.username}</Card.Title>
          <Card.Text>Email: {user?.email}</Card.Text>
          <Card.Text>Age: {user?.age}</Card.Text>
          <Card.Text>Phone: {user?.phone}</Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
            <Button variant="info" onClick={togglePasswordForm}>
              {showPasswordForm ? "Cancel" : "Modify Password"}
            </Button>
          </div>
          {showPasswordForm && (
            <Form.Group className="mt-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="primary" className="mt-2" onClick={handleChangePassword}>Update Password</Button>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
